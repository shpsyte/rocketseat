import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderServices from '@modules/appointmets/services/ListProviderServices';
import { classToClass } from 'class-transformer';

export default class ProviderController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProvider = container.resolve(ListProviderServices);

    const providers = await listProvider.execute({
      user_id,
    });

    return res.json(classToClass(providers));
  }
}
