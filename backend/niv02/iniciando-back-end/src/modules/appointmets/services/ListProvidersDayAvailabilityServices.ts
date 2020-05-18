import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import { getHours, isAfter } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;
@injectable()
class ListProvidersDayAvailabilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointmets = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());
    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointmets.find(
        a => getHours(a.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProvidersDayAvailabilityServices;
