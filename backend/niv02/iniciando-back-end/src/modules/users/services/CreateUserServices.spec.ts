import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserServices from './CreateUserServices';
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHasProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHasProvider: FakeHasProvider;
let createUserservices: CreateUserServices;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHasProvider = new FakeHasProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserservices = new CreateUserServices(
      fakeUsersRepository,
      fakeHasProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new users', async () => {
    const user = await createUserservices.execute({
      email: 'teste@teste.com',
      name: 'jose',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('jose');
  });

  it('should not be able to create a new user with the same email', async () => {
    await createUserservices.execute({
      email: 'teste@teste.com',
      name: 'jose',
      password: '1234',
    });

    await expect(
      createUserservices.execute({
        email: 'teste@teste.com',
        name: 'jose',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
