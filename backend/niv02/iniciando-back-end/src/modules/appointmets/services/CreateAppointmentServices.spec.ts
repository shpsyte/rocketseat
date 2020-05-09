import FakeAppointmentsRepository from '@modules/appointmets/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentServices from './CreateAppointmentServices';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmentServices.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const appointmentdate = new Date(2020, 4, 10, 11);

    await createAppointmentServices.execute({
      date: appointmentdate,
      provider_id: '123',
    });

    await expect(
      createAppointmentServices.execute({
        date: appointmentdate,
        provider_id: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
