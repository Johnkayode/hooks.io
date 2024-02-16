import * as express from "express";
import { NextFunction, Request, Response, Application } from 'express';
import { isCelebrateError } from 'celebrate';
import config from "./config";
import connectDatabase from "./database";

import { APIError } from "./common";
import { ingestRouter } from "./modules/ingest/ingest.routes";

const app = express()

app.use(express.json());
// app.use(cors());

// Routers
app.use('/', ingestRouter);

// // Error handling

// For handling validation errors.
app.use((err, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
        let errors: any = err.details.get('body') || err.details.get('query') || err.details.get('params');
        errors = errors.details.map((x: any) => x.message);
        return res.status(400).json(
        {
            status_code: 400,
            message: errors.join(' | '),
        }
        );
    } 
    return next(err);
});

// For handling 404 errors.
app.use((req, res, next) => {
    const err = new APIError({ message: 'That resource does not exist on this server.' });
    err.status_code = 404;
    next(err);
});

// For handling 500 errors.
app.use((err, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.status_code || 500).json(
        {
            status_code: err.status_code || 500,
            message: err.message,
        }
    );
});

app.listen( config.PORT , () => {
    console.log( `Server running on port ${config.PORT}`)
})

connectDatabase();
