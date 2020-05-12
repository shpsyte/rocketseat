import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForfortPasswordEmailServices from '@modules/users/services/SendForgotPasswordEmailServices';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForfortPasswordEmail = container.resolve(
      SendForfortPasswordEmailServices
    );

    await sendForfortPasswordEmail.execute({
      email,
    });
    return res.status(204).json();
  }
}
