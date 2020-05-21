import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import ICacheprovider from '@shared/container/providers/CacheProvider/models/ICacheprovider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheprovider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `provider-list:${user_id}`
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`provider-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProviderServices;
