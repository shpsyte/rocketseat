import ListProviderAppointmentsServices from './ListProviderAppointmentsServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointmentsServices: ListProviderAppointmentsServices;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsServices = new ListProviderAppointmentsServices(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the appointments on specific day  ', async () => {
    const aapointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const aapointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsServices.execute({
      provider_id: 'provider',
      year: 2020,
      day: 20,
      month: 5,
    });

    expect(appointments).toEqual([aapointment1, aapointment2]);
  });
});
