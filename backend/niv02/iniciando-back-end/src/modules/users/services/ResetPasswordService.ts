import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private tokenRepository: IUsersTokenRepository
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('UserToken does not exists');
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
