import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),   JwtModule.register({
    secret : "taskIDS",
    // signOptions : { expiresIn : '60s'}
  })],
  providers: [UserResolver, UserService],
})
export class UserModule {}
