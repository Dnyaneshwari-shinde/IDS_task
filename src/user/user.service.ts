import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input'; 
import { CheckUserInput } from './dto/check-user.input';
import { GetUserInput } from "./dto/get-user.input";
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  // Register
  async create(createUserInput: CreateUserInput): Promise<User> {  
    const newUser = new this.userModel(createUserInput);
    const record = await newUser.save();
    return record;
  }

  // Login
  async findOne(CheckUserInput : CheckUserInput): Promise<{ accessToken: string }> {
    console.log("data", CheckUserInput);
    const user = await this.userModel.findOne({email : CheckUserInput.email, password : CheckUserInput.password});
    if (!user) {
      throw new Error('User not found');
    }
    // Generate JWT token
    const payload = { email: user.email, sub: user._id }; // Create the payload
    const accessToken = this.jwtService.sign(payload);  // Sign the token with the payload

    return { accessToken };
  }

  // query user details
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
