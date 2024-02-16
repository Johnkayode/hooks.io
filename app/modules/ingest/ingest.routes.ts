import { Router } from "express";
import IngestService from "./ingest.service";

const ingestRouter = Router();

export { ingestRouter };


ingestRouter.get('/source', async (req, res, next) => {
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

ingestRouter.post('/source', async (req, res, next) => {
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

ingestRouter.get('/endpoint', async (req, res, next) => {
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

ingestRouter.post('/endpoint', async (req, res, next) => {
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

ingestRouter.post('/endpoint/:id/subscribe', async (req, res, next) => {
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

ingestRouter.post('/endpoint/:id/unsubscribe', async (req, res, next) => {
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

ingestRouter.patch('/endpoint/:id', async (req, res, next) => {
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

ingestRouter.post('/ingest/:id', async (req, res, next) => {
    try {
        // verify if source exists
        console.log(req.body)
        res.status(200).json({
            success: true,
            message: 'Event retrieved',
            status_code: 200,
        });
    } catch (error) {
      next(error);
    }
});