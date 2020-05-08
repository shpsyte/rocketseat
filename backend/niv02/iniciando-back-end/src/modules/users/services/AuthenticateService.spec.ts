import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/AppError';
import AuthenticateUserServices from './AuthenticateService';
import CreateUserServices from './CreateUserServices';
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHasProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHasProvider = new FakeHasProvider();
    const authenticateUserServices = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );
    const createuser = new CreateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );

    const user = await createuser.execute({
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
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHasProvider = new FakeHasProvider();

    const authenticateUser = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );

    expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong passwor/email', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHasProvider = new FakeHasProvider();
    const authenticateUserServices = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );
    const createuser = new CreateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );

    await createuser.execute({
      email: 'teste@teste.com',
      password: '1234',
      name: 'John Doe',
    });

    expect(
      authenticateUserServices.execute({
        email: 'teste@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
