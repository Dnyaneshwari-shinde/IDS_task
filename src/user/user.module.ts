import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [   JwtModule.register({
    secret : "taskIDS",
    // signOptions : { expiresIn : '60s'}
  })],
  providers: [UserResolver, UserService],
})
export class UserModule {}
