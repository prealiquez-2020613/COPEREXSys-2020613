'use strict'

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {initializeDatabase} from './initSetup.js';
import authRoutes from '../src/auth/auth.routes.js';
import { limiter } from '../middlewares/rate.limit.js';
import categoryRoutes from '../src/category/category.routes.js';
import CompanyRoutes from '../src/company/company.routes.js';
import ReportRoutes from '../src/reporter/report.routes.js';

const configs = (app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(helmet());
    app.use(limiter);
    app.use(morgan('dev'));
};

const routes = (app)=>{
    app.use(authRoutes);
    app.use('/v1/category', categoryRoutes);
    app.use('/v1/company', CompanyRoutes);
    app.use('/v1/Report', ReportRoutes);
};

export const initServer = async()=>{
    const app = express();
    try {
        configs(app);
        routes(app);

        await initializeDatabase();
        app.listen(process.env.PORT);
        console.log(`Server runnig in port ${process.env.PORT}`);
    } catch (error) {
        console.log('Server Init Failed', error);
    }
};