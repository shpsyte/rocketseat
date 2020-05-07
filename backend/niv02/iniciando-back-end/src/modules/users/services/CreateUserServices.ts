import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExiste = await userRepository.findOne({ where: { email } });

    if (checkUserExiste) {
      throw new Error('Email address already used.');
    }

    const hashedPassord = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserServices;
