import { Router } from 'express';
import appointmentsRouter from './apponitments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
