import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

export type UserDocument = User & Document

@Schema()
export class User implements UserEntity {
  _id: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) password: string;
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);