import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsServices from '@modules/appointmets/services/ListProviderAppointmentsServices';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const listProviderAppointmentsServices = container.resolve(
      ListProviderAppointmentsServices
    );

    const appointments = await listProviderAppointmentsServices.execute({
      provider_id,
      day,
      month,
      year,
    });
    return res.json(appointments);
  }
}
