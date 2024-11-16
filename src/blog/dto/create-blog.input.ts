import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => AuthorInput)
  author: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };
}

@InputType()
class AuthorInput {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
