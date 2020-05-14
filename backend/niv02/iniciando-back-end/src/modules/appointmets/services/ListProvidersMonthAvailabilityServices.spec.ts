// import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersMonthAvailabilityServices from './ListProvidersMonthAvailabilityServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProvidersMonthAvailability: ListProvidersMonthAvailabilityServices;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
// let fakeUsersRepository: FakeUserRepository;
describe('asdfasd', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUserRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProvidersMonthAvailabilityServices(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability  ', async () => {
    const name = 'jose';
    expect(name).toBe('jose');
  });

  it('should be able to list the month availability  ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = listProvidersMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
        { day: 19, available: true },
      ])
    );
  });
});
