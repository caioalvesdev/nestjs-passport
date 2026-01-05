import { Email } from 'src/modules/user/object-value/email.object-value';

export class UserDomain {
  private constructor(
    private readonly id: string,
    private readonly email: Email,
    private readonly password: string,
    private readonly refreshToken: string | null = null,
  ) {}

  public static create(props: {
    id: string;
    email: Email;
    password: string;
    refreshToken?: string | null;
  }): UserDomain {
    this.validate(props);
    return new UserDomain(
      props.id,
      props.email,
      props.password,
      props.refreshToken,
    );
  }

  private static validate(props: {
    id: string;
    email: Email;
    password: string;
  }) {
    if (!props.id) throw new Error('ID is required');
    if (!props.email) throw new Error('Email is required');
    if (!props.email.getValue()) throw new Error('Email value is required');
    if (!props.password) throw new Error('Password is required');
  }

  public getId(): string {
    return this.id;
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

  public toJSON() {
    return {
      id: this.id,
      email: this.email.getValue(),
      password: this.password,
      refreshToken: this.refreshToken,
    };
  }
}
