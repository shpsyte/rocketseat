import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import ICacheprovider from '@shared/container/providers/CacheProvider/models/ICacheprovider';
import { json } from 'express';
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
    private appointmentRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheprovider
  ) {}

  public async execute({
    provider_id,
    year,
    day,
    month,
  }: IRequest): Promise<Appointments[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointmets = await this.cacheProvider.recover<Appointments[]>(
      cacheKey
    );

    if (!appointmets) {
      appointmets = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      });

      await this.cacheProvider.save(cacheKey, appointmets);
    }

    return appointmets;
  }
}

export default ListProviderAppointmentsServices;
