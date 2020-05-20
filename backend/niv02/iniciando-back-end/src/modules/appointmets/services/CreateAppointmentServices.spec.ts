import FakeAppointmentsRepository from '@modules/appointmets/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import CreateAppointmentServices from './CreateAppointmentServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentServices: CreateAppointmentServices;
let fakeNotificationRepository: FakeNotificationRepository;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository,
      fakeNotificationRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentServices.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'user-id',
      user_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('user-id');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });

    const appointmentdate = new Date(2020, 4, 10, 11);

    await createAppointmentServices.execute({
      date: appointmentdate,
      provider_id: 'user-id',
      user_id: 'provider-id',
    });

    await expect(
      createAppointmentServices.execute({
        date: appointmentdate,
        provider_id: 'user-id',
        user_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to crate a new appointment on the past time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'user-id',
        user_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to crate an appointment with user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'user-id',
        user_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to crate an appointment without business hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'user-id',
        user_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'user-id',
        user_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
