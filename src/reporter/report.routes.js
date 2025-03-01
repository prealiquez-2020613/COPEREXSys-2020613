import { Router } from 'express';
import { generateReport } from './report.controller.js';
import {validateJwt, adminValidation} from '../../middlewares/validate.jwt.js';

const api = Router();

// Ruta privada
api.get('/generateReport', [validateJwt], [adminValidation], generateReport);

export default api;
