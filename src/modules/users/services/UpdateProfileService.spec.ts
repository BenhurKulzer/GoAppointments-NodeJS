import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano Ciclano',
      email: 'fulano@ciclano.com',
    });

    expect(updatedUser.name).toBe('Fulano Ciclano');
    expect(updatedUser.email).toBe('fulano@ciclano.com');
  });

  it('should not be able to update the profile from non existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'nonexistinguser',
        name: 'Teste',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Teste Email Duplicado',
      email: 'email@existente.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano Ciclano',
        email: 'email@existente.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano Ciclano',
      email: 'fulano@ciclano.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.name).toBe('Fulano Ciclano');
    expect(updatedUser.email).toBe('fulano@ciclano.com');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano Ciclano',
        email: 'fulano@ciclano.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano Ciclano',
        email: 'fulano@ciclano.com',
        old_password: 'wrongoldpassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
