import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserRepository implements IUserTokenRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.usersTokens.find(a => a.token === token);
    return user;
  }
}

export default FakeUserRepository;
