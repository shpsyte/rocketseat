import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileServices from './ShowProfileServices';

let fakeUsersRepository: FakeUserRepository;
let showProfileServices: ShowProfileServices;

describe('ShowProfileServices', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    showProfileServices = new ShowProfileServices(fakeUsersRepository);
  });

  it('should be able to show the profile ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    const profile = await showProfileServices.execute({ user_id: user.id });

    expect(profile.name).toBe('Joh doe');
    expect(profile.email).toBe('johndoe@example.ca');
  });

  it('should be not able to show the profile from non-exists user ', async () => {
    await expect(
      showProfileServices.execute({ user_id: 'non-exists-user' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
