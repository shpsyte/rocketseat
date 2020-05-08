import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(a => a.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(a => a.email === email);

    return user;
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const finIndex = this.users.findIndex(a => a.id === user.id);
    this.users[finIndex] = user;
    return user;
  }
}

export default UsersRepository;
