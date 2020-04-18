import Router from 'express';
import AuthenticateUserService from '../services/AuthenticateService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return res.json({ user, token });
});

export default sessionRouter;
