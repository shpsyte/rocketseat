// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/EmailProviders/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailServices {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('MailProvider') private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private tokenRepository: IUsersTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Users does not exists');
    }

    const { token } = await this.tokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha...${token}`
    );
  }
}

export default SendForgotPasswordEmailServices;
