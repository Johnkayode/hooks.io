import { Router } from "express";
import IngestService from "./ingest.service";
import ForwardService from "../forward/forward.service";
import { CreateSourceValidator, CreateUpdateEndpointValidator, SubscribeEndpointValidator } from "./ingest.validators";
import { APIError } from "../../common";
import { eventQueue } from "../../services/bull";

const ingestRouter = Router();

export { ingestRouter };

// Source
ingestRouter.get('/source', async (req, res, next) => {
    // #swagger.tags = ['Source']
    // #swagger.description = 'Retrieve all sources.' 
    try {
        const sources = await IngestService.retrieveSources();
        res.status(200).json({
            success: true,
            message: 'Sources retrieved',
            status_code: 200,
            data: sources,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.post('/source', CreateSourceValidator, async (req, res, next) => {
    // #swagger.tags = ['Source']
    // #swagger.description = 'Create new source.' 
    try {
        const source = await IngestService.createSource(req.body);
        res.status(201).json({
            success: true,
            message: 'Source created',
            status_code: 201,
            data: source,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.get('/source/:id', async (req, res, next) => {
    // #swagger.tags = ['Source']
    // #swagger.description = 'Retrieve source by id.' 
    try {
        const source = await IngestService.retrieveSource(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Source retrieved',
            status_code: 200,
            data: source,
        });
    } catch (error) {
      next(error);
    }
});

// Endpoint
ingestRouter.get('/endpoint', async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Retrieve all endpoints.' 
    try {
        const endpoints = await IngestService.retrieveEndpoints();
        res.status(200).json({
            success: true,
            message: 'Endpoints retrieved',
            status_code: 200,
            data: endpoints,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.post('/endpoint', CreateUpdateEndpointValidator, async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Create new endpoint.' 
    try {
        const endpoint = await IngestService.createEndpoint(req.body);
        res.status(201).json({
            success: true,
            message: 'Endpoint created.',
            status_code: 201,
            data: endpoint,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.get('/endpoint/:id', async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Retrieve endpoint by id.' 
    try {
        const endpoint = await IngestService.retrieveEndpoint(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Endpoint retrieved.',
            status_code: 200,
            data: endpoint,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.post('/endpoint/:id/subscribe', SubscribeEndpointValidator, async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Subscribe endpoint to a source.' 
    try {
        const subscription = await IngestService.subscribeEndpoint(req.body.sourceId, req.params.id);
        res.status(201).json({
            success: true,
            message: 'Endpoint Subscribed.',
            status_code: 200,
            data: subscription,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.post('/endpoint/:id/unsubscribe', SubscribeEndpointValidator, async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Unsubscribe an endpoint from a source.' 
    try {
        await IngestService.unsubscribeEndpoint(req.body.sourceId, req.params.id);
        res.status(201).json({
            success: true,
            message: 'Endpoint unsubscribed.',
            status_code: 201,
            data: null,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.patch('/endpoint/:id', CreateUpdateEndpointValidator, async (req, res, next) => {
    // #swagger.tags = ['Endpoint']
    // #swagger.description = 'Update endpoint.' 
    try {
        const endpoint = await IngestService.updateEndpoint(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message: 'Endpoint updated.',
            status_code: 201,
            data: endpoint,
        });
    } catch (error) {
      next(error);
    }
});


// Event & Event Delivery
ingestRouter.post('/ingest/:id', async (req, res, next) => {
    // #swagger.tags = ['Event']
    // #swagger.description = 'Ingest event from a source.' 
    try {
        // verify if source exists
        const sourceId = req.params.id
        const source = await IngestService.retrieveSource(sourceId)
       
        if (!source) {
            res.status(404).json(
                new APIError({
                    message: "Source doesn't exist.",
                    status_code: 404
                })
            )
        }
        else {
            const event = await IngestService.ingestEvent({
                sourceId,
                headers: req.headers,
                payload: req.body
            })
        
            // add event to queue for forwarding
            await eventQueue.add({
                type: 'forward-event',
                data: event
            });

            res.status(200).json({
                success: true,
                message: 'Event received',
                status_code: 200,
            });
        }
    } catch (error) {
      next(error);
    }
});

ingestRouter.get('/event', async (req, res, next) => {
    // #swagger.tags = ['Event']
    // #swagger.description = 'Retrieve all events (filter by source).' 
    try {
        let data = {};
        let sourceId = req.query.sourceId
        if (sourceId) { data = { sourceId } }
        const events = await IngestService.retrieveEvents(data);
        res.status(200).json({
            success: true,
            message: 'Events retrieved',
            status_code: 200,
            data: events,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.get('/event/:id', async (req, res, next) => {
    // #swagger.tags = ['Event']
    // #swagger.description = 'Retrieve event by id.' 
    try {
        const event = await IngestService.retrieveEvent(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Event retrieved',
            status_code: 200,
            data: event,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.get('/event/:id/deliveries', async (req, res, next) => {
    // #swagger.tags = ['Event']
    // #swagger.description = 'Retrieve all event deliveries.' 
    try {
        const eventDeliveries = await ForwardService.retrieveEventDeliveries({eventId: req.params.id});
        res.status(200).json({
            success: true,
            message: 'Event deliveries retrieved',
            status_code: 200,
            data: eventDeliveries,
        });
    } catch (error) {
      next(error);
    }
});

ingestRouter.post('/event-delivery/:id/retry', async (req, res, next) => {
    // #swagger.tags = ['Event']
    // #swagger.description = 'Retry an event delivery (max. 3 retries).' 
    try {
        const eventDelivery = await ForwardService.retrieveEventDelivery(req.params.id);

        // add eventDelivery to queue for retrying
        await eventQueue.add({
            type: 'retry-event-delivery',
            data: eventDelivery
        });

        res.status(200).json({
            success: true,
            message: 'EventDelivery queued for retry.',
            status_code: 200,
            data: null,
        });
    } catch (error) {
      next(error);
    }
});