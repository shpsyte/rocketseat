import Router from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAutheticated);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
);
profileRouter.get('/', profileController.show);

export default profileRouter;
