import Router from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProvidersController from '@modules/appointmets/infra/http/controllers/ProviderController';
import ProviderMonthAvailabilityController from '@modules/appointmets/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointmets/infra/http/controllers/ProviderDayAvailabilityController';

const providersRoute = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoute.use(ensureAutheticated);

providersRoute.get('/', providersController.index);
providersRoute.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
);
providersRoute.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
);

export default providersRoute;
