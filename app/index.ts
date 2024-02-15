import * as express from "express";
import config from "./config";
import connectDatabase from "./database";

import { ingestRouter } from "./modules/ingest/ingest.routes";

const app = express()

app.use(express.json());
// app.use(cors());
app.use('/', ingestRouter);

app.listen( config.PORT , () => {
    console.log( `Server running on port ${config.PORT}`)
})

connectDatabase();
