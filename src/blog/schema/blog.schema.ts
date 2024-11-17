import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthorInput } from '../dto/create-blog.input'; 

export type BlogDocument = Blog & Document;

@ObjectType()
@Schema({ collection: 'blog' })
export class Blog {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => AuthorInput)  
  @Prop({ type: AuthorInput })  
  author: AuthorInput;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

@ObjectType()
export class BlogPagination {
  @Field(() => [Blog])
  blogs: Blog[];

  @Field(() => Int)
  totalCount: number;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
