import * as express from 'express';
import { JsonCsvConverter } from "json-csv-tool";

export const registerRoutes = ( app: express.Application ) => {
    app.post( '/api/jsontocsv', async ( req: any, res ) => {
        const converter = new JsonCsvConverter();
        const convertedCsv = converter.convertJsonToCsv(req.body);
        res.json({
            result: convertedCsv.csv
        })
    } );
}