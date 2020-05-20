import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatar';
import { classToClass } from 'class-transformer';

export default class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const {
      file: { filename },
      user: { id },
    } = req;

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFileName: filename,
    });
    delete user.password;
    return res.json(classToClass(user));
  }
}
