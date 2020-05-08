import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/AppError';
import CreateUserServices from './CreateUserServices';
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHasProvider';

describe('CreateUser', () => {
  it('should be able to create a new users', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHasProvider = new FakeHasProvider();
    const createUserservices = new CreateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );

    const user = await createUserservices.execute({
      email: 'teste@teste.com',
      name: 'jose',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('jose');
  });

  it('should not be able to create a new user with the same email', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHasProvider = new FakeHasProvider();

    const createUserservices = new CreateUserServices(
      fakeUsersRepository,
      fakeHasProvider
    );

    await createUserservices.execute({
      email: 'teste@teste.com',
      name: 'jose',
      password: '1234',
    });

    expect(
      createUserservices.execute({
        email: 'teste@teste.com',
        name: 'jose',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
