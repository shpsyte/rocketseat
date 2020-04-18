import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointementDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointementDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }

  public finByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(a => isEqual(date, a.date));

    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentRepository;
