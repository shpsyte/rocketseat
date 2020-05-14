import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderServices from './ListProviderServices';

let fakeUsersRepository: FakeUserRepository;
let listProviderServices: ListProviderServices;

describe('ShowProfileServices', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    listProviderServices = new ListProviderServices(fakeUsersRepository);
  });

  it('should be able to list the provider ', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joh tre',
      email: 'johndoe2@example.ca',
      password: '1345',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Joh qua',
      email: 'johndoe3@example.ca',
      password: '1345',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged user',
      email: 'log@example.ca',
      password: '1345',
    });

    const provider = await listProviderServices.execute({
      user_id: loggedUser.id,
    });

    expect(provider).toEqual([user1, user2, user3]);
  });
});
