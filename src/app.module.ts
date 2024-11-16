import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      debug: process.env.NODE_ENV !== 'production',
      typePaths: ['./**/*.graphql'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/IDS_task'),
    UserModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log('Initializing MongoDB connection check...');

    // Directly check if the connection is open
    if (mongoose.connection.readyState === 1) {
      this.logger.log('MongoDB connection established successfully!');
    } else {
      this.logger.error('MongoDB connection failed ohh shut!');
    }

    // Set up Mongoose events
    mongoose.connection.on('connected', () => {
      this.logger.log('MongoDB connection established successfully!');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('MongoDB connection disconnected!');
    });
  }
}
