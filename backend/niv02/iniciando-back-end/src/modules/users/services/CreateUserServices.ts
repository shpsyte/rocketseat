import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheprovider from '@shared/container/providers/CacheProvider/models/ICacheprovider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('HashProvider') private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheprovider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExiste = await this.userRepository.findByEmail(email);

    if (checkUserExiste) {
      throw new AppError('Email address already used.');
    }

    const hashedPassord = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return user;
  }
}

export default CreateUserServices;
