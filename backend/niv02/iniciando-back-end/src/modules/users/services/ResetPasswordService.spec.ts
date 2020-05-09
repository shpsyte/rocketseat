import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPasswordSercices', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository
    );
  });

  it('should be able to reset password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const userUpdate = await fakeUsersRepository.findById(user.id);

    expect(userUpdate?.password).toBe('123123');
  });
});
