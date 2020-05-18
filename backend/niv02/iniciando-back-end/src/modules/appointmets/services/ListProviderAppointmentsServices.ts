import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    day,
    month,
  }: IRequest): Promise<Appointments[]> {
    const appointmets = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );
    return appointmets;
  }
}

export default ListProviderAppointmentsServices;
