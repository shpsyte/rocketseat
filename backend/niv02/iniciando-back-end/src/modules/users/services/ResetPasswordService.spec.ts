import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHasProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordSercices', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generatehash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const userUpdate = await fakeUsersRepository.findById(user.id);

    expect(generatehash).toHaveBeenCalledWith('123123');
    expect(userUpdate?.password).toBe('123123');
  });

  it('should be not able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existin-token',
        password: '13456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-exists-users'
    );

    await expect(
      resetPassword.execute({
        token,
        password: '13456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password more than 2h', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123456',
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
