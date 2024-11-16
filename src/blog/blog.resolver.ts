import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './schema/blog.schema';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  @Query('getAllBlogs')
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Blog, { name: 'getBlogById' })
  async getBlogById(@Args('id', { type: () => String }) id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput): Promise<Blog> {
    console.log('update called resolver', updateBlogInput);
    const { id, ...updateFields } = updateBlogInput; // Destructure id and update fields
    return this.blogService.update(id, updateFields);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  async removeBlog(@Args('id') id: string): Promise<Blog> {
    return this.blogService.remove(id);
  }
}

