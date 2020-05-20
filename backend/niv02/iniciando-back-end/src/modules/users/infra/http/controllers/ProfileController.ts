import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileServices from '@modules/users/services/UpdateProfileServices';
import ShowProfileServices from '@modules/users/services/ShowProfileServices';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = container.resolve(ShowProfileServices);
    const user = await showProfile.execute({ user_id });
    delete user.password;
    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const updateProfile = container.resolve(UpdateProfileServices);
    const user_id = req.user.id;

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete user.password;

    return res.json(classToClass(user));
  }
}
