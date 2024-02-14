import * as express from "express";
import config from "./config";
import connectDatabase from "./database";


const app = express()

app.listen( config.PORT , () => {
    console.log( `Server running on port ${config.PORT}`)
})

connectDatabase();
