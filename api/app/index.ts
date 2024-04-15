import { app } from './app'
import config from "./config";
import connectDatabase from "./database";


app.listen( config.PORT , () => {
    console.log( `Server running on port ${config.PORT}`)
})

connectDatabase();
