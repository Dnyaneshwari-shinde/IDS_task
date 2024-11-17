import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { CheckUserInput } from './dto/check-user.input';
import {LoginResponse} from "./dto/login-response.input";
import {GetUserInput} from "./dto/get-user.input";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
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

  @Mutation(() => LoginResponse) 
  async login(@Args('CheckUserInput') CheckUserInput: CheckUserInput): Promise<{ accessToken: string }> {
    return this.userService.findOne(CheckUserInput);
  }
  
  // @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findOneUser(@Args('GetUserInput') getUserInput: GetUserInput): Promise<User> {
    return this.userService.findByEmail(getUserInput.email);
  }


}
