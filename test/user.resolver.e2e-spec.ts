import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/schema/user.schema';
import { CreateUserInput } from '../src/user/dto/create-user.input';
import { Role } from '../src/auth/enums/role.enums';
import { LoginResponse } from "../src/user/dto/login-response.input";

describe('User Resolver (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService) // Override the provider to mock UserService
      .useValue({
        create: jest.fn(),
        login: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  it('should register a new user (registration mutation)', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedpassword',
      role: Role.USER,
    };

    // Mock the `create` method
    jest.spyOn(userService, 'create').mockResolvedValue(mockUser as never);

    const registrationMutation = `
      mutation {
        registration(createUserInput: {
          username: "testuser"
          email: "testuser@example.com"
          password: "testpassword"
          role: "USER"
        }) {
          id
          username
          email
          role
        }
      }`;

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: registrationMutation })
      .expect(200)
      .expect((response) => {
        const { data } = response.body;
        console.log("data", data)
      });
  });

  it('should log in a user (login mutation)', async () => {
    const mockAccessToken = 'eyJhbGciOiJIUzI1NiJ9.aGl0aGlzZGF0YQ.h8K1N2uStxIgY2p68XxSZr-W3_qTxgSgQbWpaaGXRmU';

    const loginMutation = `
      mutation {
        login(CheckUserInput: {
          email: "testuser@example.com"
          password: "testpassword"
        }) {
          accessToken
        }
      }`;

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: loginMutation })
      .expect(200)
      .expect((response) => {
        const { data } = response.body;
        console.log("data", data);
      });
  });

  afterEach(async () => {
    jest.clearAllMocks(); // Clear mocks after each test
    await app.close();
  });
});
