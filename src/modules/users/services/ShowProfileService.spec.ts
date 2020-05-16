import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Fulano da Silva');
    expect(profile.email).toBe('fulano@silva.com');
  });

  it('should not be able to show the profile from non existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'nonexistinguserid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
