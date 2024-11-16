import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { CheckUserInput } from './dto/check-user.input';
import {LoginResponse} from "./dto/login-response.input";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import {User} from './schema/user.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Mutation(() => User)
  async registration(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  // @UseGuards(GqlAuthGuard)
  // @Query('getUser')
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query('generateToken')
  // getToken()  {
  //   return this.userService.newToken();
  // }

  @Mutation(() => LoginResponse) // Match the updated schema
  async login(@Args('CheckUserInput') CheckUserInput: CheckUserInput): Promise<{ accessToken: string }> {
    return this.userService.findOne(CheckUserInput);
  }
  
}
