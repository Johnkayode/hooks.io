import { Router } from "express";
import IngestService from "./ingest.service";

const ingestRouter = Router();

export { ingestRouter };


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

ingestRouter.post('/source/create', async (req, res, next) => {
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