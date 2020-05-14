import Router from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProvidersController from '@modules/appointmets/infra/http/controllers/ProviderController';

const providersRoute = Router();
const providersController = new ProvidersController();

providersRoute.use(ensureAutheticated);

providersRoute.get('/', providersController.index);

export default providersRoute;
