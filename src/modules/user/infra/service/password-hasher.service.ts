import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

@Injectable()
export class BycriptPasswordHasherService implements PasswordHasher {
  public async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  public async compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
