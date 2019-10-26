import * as bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from './routes'

dotenv.config();
const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
const port = process.env.SERVER_PORT; // default port to listen

// using EJS for the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

routes.registerRoutes(app);

// start the Express server
app.listen(port, () => {
    // console.log( `server started at http://localhost:${ port }` );
});