import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from './routes'

dotenv.config();
const app = express();
app.use( express.json() );
const port = process.env.SERVER_PORT; // default port to listen

// using EJS for the view engine
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use( express.static( path.join( __dirname, "public" ) ) );

routes.registerRoutes(app);

// start the Express server
app.listen( port, () => {
    // console.log( `server started at http://localhost:${ port }` );
} );