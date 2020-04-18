import Router from 'express';
import multer from 'multer';
import UserServices from '../services/CreateUserServices';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatar from '../services/UpdateUserAvatar';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new UserServices();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatar();
      const {
        file: { filename },
        user: { id },
      } = req;

      const user = await updateUserAvatar.execute({
        user_id: id,
        avatarFileName: filename,
      });
      delete user.password;
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

export default usersRoutes;
