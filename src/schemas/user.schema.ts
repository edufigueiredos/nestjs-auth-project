import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User implements UserModel {
  _id: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) password: string;
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);