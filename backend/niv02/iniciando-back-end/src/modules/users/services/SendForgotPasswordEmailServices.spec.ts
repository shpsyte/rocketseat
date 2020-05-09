import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/EmailProviders/fakes/FakeMailProvider';
// import IMailProvider from '@shared/container/providers/EmailProviders/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailServices from './SendForgotPasswordEmailServices';

let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotEmail: SendForgotPasswordEmailServices;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotEmail = new SendForgotPasswordEmailServices(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  });

  it('should be able to recover the password using email', async () => {
    const senEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@example.com',
      password: 'Warr3434$$%',
    });

    await sendForgotEmail.execute({
      email: 'john@example.com',
    });

    expect(senEmail).toHaveBeenCalled();
  });

  it('should be not able to recover a non-exixsts password', async () => {
    await expect(
      sendForgotEmail.execute({
        email: 'john-non-exists@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate token for password token ', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@example.com',
      password: 'Warr3434$$%',
    });

    await sendForgotEmail.execute({
      email: 'john@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
