import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsServices from '@modules/appointmets/services/ListProviderAppointmentsServices';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointmentsServices = container.resolve(
      ListProviderAppointmentsServices
    );

    const appointments = await listProviderAppointmentsServices.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });
    return res.json(classToClass(appointments));
  }
}
