import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {


  constructor ( private jwtService : JwtService)  {}
  
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return {
      id: 101, 
      username: "Dnyanu",
      email: "ds123@gmail.com",
      password: "dnyanu123",
      role: "Developer"
    }
  }

  newToken() {
    return this.jwtService.signAsync({username: "Dnyanu"})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
