import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@silva.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Ciclano da Silva',
      email: 'ciclano@silva.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Zezinho da Silva',
      email: 'zezinho@silva.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
