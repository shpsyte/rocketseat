import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppontmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointmets/dtos/IFindAllInMonthFromProviderDTO';
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

class AppointmentRepository implements IAppontmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);
    return appointment;
  }

  public async finByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = this.appointments.find(a => isEqual(a.date, date));
    return findAppoitment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appoitments = this.appointments.filter(a => {
      return (
        a.provider_id === provider_id &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year
      );
    });
    return appoitments;
  }
}

export default AppointmentRepository;
