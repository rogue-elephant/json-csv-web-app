import * as express from 'express';
import * as api from './api'

export const registerRoutes = ( app: express.Application ) => {
    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // define a secure route handler for the guitars page
    app.get( "/guitars", ( req: any, res ) => {
        res.render( "guitars" );
    } );

    api.registerRoutes(app);
};