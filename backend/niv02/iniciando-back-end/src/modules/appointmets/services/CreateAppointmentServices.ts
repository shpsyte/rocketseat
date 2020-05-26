import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheprovider from '@shared/container/providers/CacheProvider/models/ICacheprovider';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheprovider
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    // const ptBR: Locale;

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot make an appointment in past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot make an appointment with yourself');
    }

    const checkIfExists = await this.appointmentsRepository.finByDate(
      appointmentDate,
      provider_id
    );

    if (checkIfExists) {
      throw new AppError('This appointment is already booked');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You cannot make an appointment withuot business hours'
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated} `,
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d'
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentServices;
