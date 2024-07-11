import { Request, Response } from 'express';
import axios from 'axios';
import { sortArray } from "../utils/sort";
import { paginateArray } from "../utils/pagination";

/**
 * Represents a country with specific properties.
 */
interface Country {
    cca2:string;
    name: string;
    population: number;
    capital: string;
    region: string;
    flag: string;
}

/**
 * Retrieves all countries from a remote API and applies sorting and pagination based on query parameters.
 * @param req The request object.
 * @returns An array of countries based on the query parameters for sorting and pagination.
 */
export async function GetAllCountriesService(req: Request) {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    if (response.status != 200) {
        throw new Error;
    }

    const sort_order:string = req.query.hasOwnProperty('sort_order') && req.query.sort_order != '' ? String(req.query.sort_order) : 'desc';
    const sort_field:string = req.query.hasOwnProperty('sort_field') && req.query.sort_field != '' ? String(req.query.sort_field) : 'population';
    const search:string = req.query.hasOwnProperty('search') && req.query.search != '' ? String(req.query.search) : '';
    const page:number = req.query.hasOwnProperty('page') && req.query.page != '' ? Number(req.query.page) : 1;
    const per_page:number = req.query.hasOwnProperty('per_page') && req.query.per_page != '' ? Number(req.query.per_page) : 10;
    
    const countries: Country[] = [];
    response.data.forEach(element => {
        let country: Country = {
            cca2:element.cca2,
            name: element.name.common,
            population: element.population,
            capital: element.hasOwnProperty("capital") ? element.capital[0] : "",
            region: element.region,
            flag: element.flags['png'],
        };

        if(country.name.toLowerCase().includes(search.toLowerCase(), 0)) {
            countries.push(country);
        }
    });
    if (countries.length > 0) {
        sortArray(countries, sort_order, sort_field as keyof Country)
    }
  
    return paginateArray(countries, page, per_page);
}

export async function GetAllCountriesByRegionService(req: Request) {
    const region = String(req.params.region);
    const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
    if (response.status != 200){
      throw new Error();
    }

    const sort_order:string = req.query.hasOwnProperty('sort_order') && req.query.sort_order != '' ? String(req.query.sort_order) : 'desc';
    const sort_field:string = req.query.hasOwnProperty('sort_field') && req.query.sort_field != '' ? String(req.query.sort_field) : 'population';
    const search:string = req.query.hasOwnProperty('search') && req.query.search != '' ? String(req.query.search) : '';
    const page:number = req.query.hasOwnProperty('page') && req.query.page != '' ? Number(req.query.page) : 1;
    const per_page:number = req.query.hasOwnProperty('per_page') && req.query.per_page != '' ? Number(req.query.per_page) : 10;

    const countries: Country[] = [];
    response.data.forEach(element => {
        let country: Country = {
            cca2: element.cca2,
            name: element.name.common,
            population: element.population,
            capital: element.hasOwnProperty("capital") ? element.capital[0] : "",
            region: element.region,
            flag: element.flags['png'],
        };

        if(country.name.toLowerCase().includes(search.toLowerCase(), 0)) {
            countries.push(country);
        }
    });
    if (countries.length > 0) {
        sortArray(countries, sort_order, sort_field as keyof Country)
    }
    return paginateArray(countries, page, per_page);
}