import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserServices from '@modules/users/services/CreateUserServices';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const createUser = container.resolve(UserServices);

      const user = await createUser.execute({ name, email, password });

      delete user.password;

      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
