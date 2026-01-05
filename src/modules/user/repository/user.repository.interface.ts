import { UserDomain } from 'src/modules/user/domain/user.domain';
import { Email } from 'src/modules/user/object-value/email.object-value';

export interface IUserRepository {
  findAll(): Promise<Array<UserDomain>>;
  findByEmail(email: Email): Promise<UserDomain | null>;
  create(user: UserDomain): Promise<void>;
}
