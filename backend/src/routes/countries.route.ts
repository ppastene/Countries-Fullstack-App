import { Router } from 'express';
import { GetAllCountries, GetCountriesByRegion } from '../controllers/countries.controller';

const router: Router = Router();

router.get('/all', GetAllCountries);
router.get('/region/:region', GetCountriesByRegion);

export default router;