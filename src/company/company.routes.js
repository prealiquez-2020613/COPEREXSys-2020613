import {Router} from 'express';
import {addCompany, getCompanies, getCompanyById, updateCompany} from './company,controller.js';
import {validateJwt, adminValidation} from '../../middlewares/validate.jwt.js';
import {companyRegisterValidator, updateCompanyRegisterValidator} from '../../helpers/validators.js';

const api = Router();


//RUTAS PRIVADAS
api.post('/addCompany', [validateJwt], [adminValidation], [companyRegisterValidator], addCompany);
api.get('/getCompanies', [validateJwt], [adminValidation], getCompanies);
api.get('/getCompanyById/:id',[validateJwt], [adminValidation], getCompanyById);
api.put('/updateCompany/:id',[validateJwt], [adminValidation], [updateCompanyRegisterValidator], updateCompany);

export default api;