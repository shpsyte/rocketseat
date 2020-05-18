import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointmets/infra/typeorm/entities/Appointment';
import IAppontmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import ICreateAppointmentDTO from '@modules/appointmets/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointmets/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointmets/dtos/IFindAllInDayFromProviderDTO';

class AppointmentRepository implements IAppontmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmet = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });
    await this.ormRepository.save(appointmet);

    return appointmet;
  }

  public async finByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');
    const appoitment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'MM-YYYY') = '${parseMonth}-${year}'`
        ),
      },
    });
    return appoitment;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');
    const parseDay = String(day).padStart(2, '0');
    const appoitment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        ),
      },
    });
    return appoitment;
  }
}

export default AppointmentRepository;
