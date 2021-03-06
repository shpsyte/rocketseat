import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/AppError';
import AuthenticateUserServices from './AuthenticateService';
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHasProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHasProvider: FakeHasProvider;
let authenticateUserServices: AuthenticateUserServices;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHasProvider = new FakeHasProvider();
    authenticateUserServices = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      password: '1234',
      name: 'John Doe',
    });

    const response = await authenticateUserServices.execute({
      email: 'teste@teste.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able no authenticate with non exists user ', async () => {
    await expect(
      authenticateUserServices.execute({
        email: 'teste@teste.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong passwor/email', async () => {
    await fakeUsersRepository.create({
      email: 'teste@teste.com',
      password: '1234',
      name: 'John Doe',
    });

    await expect(
      authenticateUserServices.execute({
        email: 'teste@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
