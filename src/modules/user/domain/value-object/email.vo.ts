export class Email {
  private constructor(private readonly value: string) {}

  public static create(value: string): Email {
    if (!this.isValidEmail(value)) throw new Error('Invalid email format');
    return new Email(value);
  }

  private static isValidEmail(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  public isEqual(other: Email): boolean {
    return this.value === other.value;
  }

  public getValue(): string {
    return this.value;
  }
}
