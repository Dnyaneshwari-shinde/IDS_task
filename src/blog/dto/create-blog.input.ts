import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../auth/enums/role.enums';

@InputType()
export class AuthorInput {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => AuthorInput) 
  author: AuthorInput
}


