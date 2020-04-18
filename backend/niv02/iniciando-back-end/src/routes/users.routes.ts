import Router from 'express';
import UserServices from '../services/CreateUserServices';

const usersRoutes = Router();

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

export default usersRoutes;
