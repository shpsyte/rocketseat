import Router from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';
import { celebrate, Segments, Joi } from 'celebrate';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const avatarController = new AvatarController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().email().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRoutes.patch(
  '/avatar',

  ensureAutheticated,
  upload.single('avatar'),
  avatarController.update
);

export default usersRoutes;
