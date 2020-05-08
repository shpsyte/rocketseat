import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateUserAvatarServices from './UpdateUserAvatar';

describe('UpdateUserAvatar', () => {
  it('should be able to create a avatar ', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarServices = new UpdateUserAvatarServices(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    await updateUserAvatarServices.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to create a avatar ', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarServices = new UpdateUserAvatarServices(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatarServices.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when has another one ', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarServices = new UpdateUserAvatarServices(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'Joh doe',
      email: 'johndoe@example.ca',
      password: '1345',
    });

    await updateUserAvatarServices.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarServices.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
