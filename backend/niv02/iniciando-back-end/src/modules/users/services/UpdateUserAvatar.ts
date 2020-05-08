import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only auth user can change avatar', 401);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatar;
