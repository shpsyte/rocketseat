import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersMonthAvailabilityServices from '@modules/appointmets/services/ListProvidersMonthAvailabilityServices';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProvidersMonthAvailabilityServices = container.resolve(
      ListProvidersMonthAvailabilityServices
    );

    const providers = await listProvidersMonthAvailabilityServices.execute({
      provider_id,
      month,
      year,
    });

    return res.json(providers);
  }
}
