import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enums';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ collection: 'user' })
export class User {
  @Field(() => ID)
  _id: string; 

  @Field()
  @Prop({ required: true })
  username: string; 

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string; 

  @Field(() => Role)
  @Prop({ required: true, enum: Role, type: String })
  role: Role;

  @Field(() => Date)
  @Prop({ default: Date.now }) // Set default to current time
  createdAt: Date; // Date when the user was created

  @Field(() => Date)
  @Prop({ default: Date.now }) // Set default to current time
  updatedAt: Date; // Date when the user was last updated
}

export const UserSchema = SchemaFactory.createForClass(User);
