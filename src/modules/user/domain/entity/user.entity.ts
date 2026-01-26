import { Email } from '@modules/user/domain/value-object';

interface IUserEntityProps {
  id: string;
  name: string;
  email: Email;
  password: string;
  refreshToken?: string | null;
}

export class UserEntity {
  private constructor(
    private readonly id: string,
    private name: string,
    private readonly email: Email,
    private password: string,
    private readonly refreshToken: string | null = null,
  ) {}

  public static create(props: IUserEntityProps): UserEntity {
    this.validate(props);
    return new UserEntity(props.id, props.name, props.email, props.password, props.refreshToken);
  }

  private static validate(props: Pick<IUserEntityProps, 'id' | 'email' | 'password'>): void {
    if (!props.id) throw new Error('ID is required');
    if (!props.email) throw new Error('Email is required');
    if (!props.email.getValue()) throw new Error('Email value is required');
    if (!props.password) throw new Error('Password is required');
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.getValue(),
      password: this.password,
      refreshToken: this.refreshToken,
    };
  }
}
