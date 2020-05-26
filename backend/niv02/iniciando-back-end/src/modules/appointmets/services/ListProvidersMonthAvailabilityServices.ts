import 'reflect-metadata';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;
@injectable()
class ListProvidersMonthAvailabilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      }
    );

    const numberOfDayinMonth = getDaysInMonth(new Date(year, month - 1));
    const eahDayArray = Array.from(
      { length: numberOfDayinMonth },
      (_, index) => index + 1
    );

    const availability = eahDayArray.map(day => {
      const comparedDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentInDay = appointments.filter(a => {
        return getDate(a.date) === day;
      });

      return {
        day,
        available:
          isAfter(comparedDate, new Date()) && appointmentInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProvidersMonthAvailabilityServices;
