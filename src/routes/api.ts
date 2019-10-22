import * as express from 'express';

export const registerRoutes = ( app: express.Application ) => {
    app.get( '/api/jsontocsv', async ( req: any, res ) => {
        res.json({
            result: 'poop'
        })
    } );
}