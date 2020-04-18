import { Router } from 'express';
import appointmentsRouter from './apponitments.routes';
import usersRoutes from './users.routes';
import sessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
