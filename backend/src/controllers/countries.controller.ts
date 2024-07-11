import { Request, Response } from 'express';
import { GetAllCountriesService, GetAllCountriesByRegionService } from '../services/countries.service'

/**
 * Retrieves all countries and sends the response.
 * @param req The request object.
 * @param res The response object.
 */
export function GetAllCountries(req: Request, res: Response): void {
    GetAllCountriesService(req)
    .then(response => {
        res.status(200);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0',
        });
        res.json(response);
    }).catch(error => {
        res.status(500).json(error);
        return;
    });
}

/**
 * Retrieves countries by region and sends the response.
 * @param req The request object.
 * @param res The response object.
 */
export function GetCountriesByRegion(req: Request, res: Response): void {
    GetAllCountriesByRegionService(req)
    .then(response => {
        res.status(200);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0',
        });
        res.json(response);
    }).catch(error => {
        res.status(500).json(error);
    });
}