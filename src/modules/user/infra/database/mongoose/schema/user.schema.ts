import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  public readonly _id: Types.ObjectId;

  @Prop()
  public readonly name: string;

  @Prop({ unique: true })
  public readonly email: string;

  @Prop()
  public readonly refreshToken?: string;

  @Prop()
  public readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
