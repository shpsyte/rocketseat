import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    return res.json({ user: classToClass(user), token });
  }
}
