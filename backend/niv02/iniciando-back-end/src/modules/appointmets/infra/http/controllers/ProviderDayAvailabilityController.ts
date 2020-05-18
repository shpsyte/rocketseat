import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersDayAvailabilityServices from '@modules/appointmets/services/ListProvidersDayAvailabilityServices';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.body;

    const listProvidersDayAvailabilityServices = container.resolve(
      ListProvidersDayAvailabilityServices
    );

    const providers = await listProvidersDayAvailabilityServices.execute({
      provider_id,
      month,
      year,
      day,
    });

    return res.json(providers);
  }
}
