import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHasProvider';
import UpdateProfileServices from './UpdateProfileServices';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileServices;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileServices(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to update the profile ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Joh Doe3',
      email: 'johntre@example.ca',
    });

    expect(userUpdated.name).toBe('Joh Doe3');
    expect(userUpdated.email).toBe('johntre@example.ca');
  });

  it('should be not able to change to antoher user email  ', async () => {
    await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'teste@example.ca',
      password: '1345',
    });

    const user = await fakeUsersRepository.create({
      name: 'Joh doe 2',
      email: 'teste@example.ca',
      password: '1345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joh Doe3',
        email: 'teste@example.ca',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Joh Doe3',
      email: 'johntre@example.ca',
      old_password: '1345',
      password: '123123',
    });

    expect(userUpdated.password).toBe('123123');
  });

  it('should be not able to update the password with the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joh Doe3',
        email: 'johntre@example.ca',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update the password with the wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joh Doe3',
        email: 'johntre@example.ca',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not update the profile from non-exists user ', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-exists-user',
        name: 'Joh Doe3',
        email: 'johntre@example.ca',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
