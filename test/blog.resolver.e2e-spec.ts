import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { BlogService } from '../src/blog/blog.service';
import { Blog } from '../src/blog/schema/blog.schema';
import { CreateBlogInput } from '../src/blog/dto/create-blog.input';
import { Role } from '../src/auth/enums/role.enums';

describe('Blog Resolver (e2e)', () => {
  let app: INestApplication;
  let blogService: BlogService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    blogService = moduleFixture.get<BlogService>(BlogService);
    await app.init();
  });

  it('should create a new blog (createBlog mutation)', async () => {
    const createBlogInput: CreateBlogInput = {
      title: 'Test Blog',
      content: 'Test Content',
      author: {
        id : "101",
        username : "Dnaynu",
        email : "dnyanu123@gmail.com",
        role : Role.ADMIN
      },
    };

    // Mock the create method of BlogService
    const mockBlog = {
      title: 'Test Blog',
      content: 'Test Content',
      author: {
        id : "101",
        username : "Dnaynu",
        email : "dnyanu123@gmail.com",
        role : Role.ADMIN
      },
    };

    // You can mock the service method if you want to control the response
    jest.spyOn(blogService, 'create').mockResolvedValue(mockBlog as unknown as Blog);

    const createBlogMutation = `
    mutation {
      createBlog(createBlogInput: {
        title: "Test Blog"
        content: "Test Content"
      }) {
        title
        content
      }
    }`;
  

    return request(app.getHttpServer())
    .post('/graphql')
    .send({ query: createBlogMutation })
    .expect(200)
    .expect((response) => {
      console.log('Response body:', response.body.data); 
    });
  });


  it('should get a blog by id (getBlogById query)', async () => {

    // GraphQL query for getting a blog by id
    const getBlogByIdQuery = `
    query {
        getBlogById(id: "6738f45985f3f06fd5a68472") {
          id
          title
          content
          createdAt
          updatedAt
        }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getBlogByIdQuery })
      .expect(200)
      .expect((response) => {
        console.log('Response body:', response.body.data);
        const { data, errors } = response.body;
        if (errors) {
          console.error('Errors:', errors);
        }
      });
  });

  it('should update an existing blog (updateBlog mutation)', async () => {
    // GraphQL mutation for updating a blog
    const updateBlogMutation = `
      mutation {
        updateBlog(
          updateBlogInput: {
            id: "6738f3d885f3f06fd5a68470",
            title: "Solidity Development",
            content: "Document describes the basics of Solidity"
          }
        ) {
          title
          content
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: updateBlogMutation })
      .expect(200)
      .expect((response) => {
        console.log('Response body:', response.body.data);

        const { data, errors } = response.body;
        if (errors) {
          console.error('Errors:', errors);
        }
      })
    })


    it('should remove a blog (removeBlog mutation)', async () => {
      const removeBlogMutation = `
        mutation {
          removeBlog(id: "6738f45985f3f06fd5a68472") {
            id
            title
            content
            author {
              id
              username
              email
              role
            }
          }
        }`;
  
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: removeBlogMutation })
        .expect(200)
        .expect((response) => {
          console.log('Response body:', response.body.data);
        });
    });
  
  afterEach(async () => {
    await app.close(); 
  });
});
