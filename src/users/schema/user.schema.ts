import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  readonly _id: Types.ObjectId;

  @Prop({ unique: true })
  readonly email: string;

  @Prop()
  readonly refreshToken?: string;

  @Prop()
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
