import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { Email } from 'src/modules/user/domain/value-object/email.vo';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findAll(): Promise<Array<UserEntity>>;
  findByEmail(email: Email): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  updateRefreshToken(id: string, refreshToken: string | null): Promise<void>;
  create(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
