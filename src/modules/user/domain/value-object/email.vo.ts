export class Email {
  private constructor(private readonly value: string) { }

  public static create(value: string): Email {
    this.validate(value);
    return new Email(value);
  }

  private static validate(value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) throw new Error('Invalid email format');
  }

  public isEqual(other: Email): boolean {
    return this.value === other.value;
  }

  public getValue(): string {
    return this.value;
  }
}
