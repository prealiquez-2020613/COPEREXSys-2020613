//Validar campos en las rutas
import {body} from 'express-validator'; //Captura todo el body de la solicitud
import {validateErrorWithoutImg} from './validate.error.js'
import {existCategory, existEmail, existCompany} from './db.validators.js'

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty').notEmpty(),
    body('password', 'Password cannot be empty').notEmpty().isLength({min : 8}),
    validateErrorWithoutImg
];

export const addCategoryValidator = [
    body('name', 'Name is required').notEmpty().isLength({max : 50}).custom(existCategory),
    body('description', 'Description is required').notEmpty().isLength({max : 100}),
    validateErrorWithoutImg
];

export const updateCategoryValidation = [
    body('name', 'Name is required').optional().notEmpty().isLength({max : 50}).custom(existCategory),
    body('description', 'Description is required').optional().notEmpty().isLength({max : 100}),
    validateErrorWithoutImg
];

export const companyRegisterValidator = [
    body('name', 'Name cannot be empty').notEmpty().custom(existCompany),
    body('impactLevel', 'Impact Level cannot be empty').notEmpty(),
    body('yearsOfExperience', 'Years Of Experience cannot be empty').notEmpty(),
    body('category', 'Category cannot be empty').notEmpty().custom(existCategory),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrorWithoutImg
];

export const updateCompanyRegisterValidator = [
    body('name', 'Name cannot be empty').optional().notEmpty().custom(existCompany),
    body('impactLevel', 'Impact Level cannot be empty').optional().notEmpty(),
    body('yearsOfExperience', 'Years Of Experience cannot be empty').optional().notEmpty(),
    body('category', 'Category cannot be empty').optional().notEmpty().custom(existCategory),
    body('email', 'Email cannot be empty').optional().notEmpty().isEmail().custom(existEmail),
    body('phone', 'Phone cannot be empty').optional().notEmpty().isMobilePhone(),
    validateErrorWithoutImg
];