import {
  ClassConstructor,
  plainToInstance,
  instanceToPlain,
} from 'class-transformer';

export abstract class BaseDTO {
  static toInstance<T extends BaseDTO>(
    this: ClassConstructor<T>,
    data: Record<string, any>,
  ): T {
    return plainToInstance(this, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  static toManyInstance<T extends BaseDTO>(
    this: ClassConstructor<T>,
    data: Array<Record<string, any>>,
  ): Array<T> {
    return plainToInstance(this, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  toJSON(): Record<string, any> {
    return instanceToPlain(this, { exposeUnsetFields: false });
  }
}
