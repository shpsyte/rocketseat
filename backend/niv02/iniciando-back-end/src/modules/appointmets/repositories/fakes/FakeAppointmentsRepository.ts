import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppontmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

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
}

export default AppointmentRepository;
