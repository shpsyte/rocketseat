import { Router } from 'express';
import appointmentsRouter from '@modules/appointmets/infra/http/routes/apponitments.routes';
import providersRouter from '@modules/appointmets/infra/http/routes/providers.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
