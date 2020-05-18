import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointmets/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointmets/dtos/IFindAllInDayFromProviderDTO';

export default interface IAppontmentsRepository {
  finByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}
