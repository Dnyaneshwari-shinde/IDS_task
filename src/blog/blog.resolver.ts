import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog, BlogPagination} from './schema/blog.schema';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';
import { Roles } from "../auth/roles/roles.decorator";
import { Role } from '../auth/enums/role.enums';
import { CurrentUser } from '../auth/roles/current-user.decorator';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  // @Query('getAllBlogs')
  // async getAllBlogs(): Promise<Blog[]> {
  //   return this.blogService.findAll();
  // }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Blog, { name: 'getBlogById' })
  async getBlogById(@Args('id', { type: () => String }) id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Blog)
  async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput): Promise<Blog> {
    console.log('update called resolver', updateBlogInput);
    const { id, ...updateFields } = updateBlogInput;
    return this.blogService.update(id, updateFields);
  }

  @Mutation(() => Blog)
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.USER) 
  async removeBlog(
    @Args('id') id: string,
    @CurrentUser() user: any, 
  ): Promise<Blog> {
    if (user.role === Role.ADMIN) {
      return this.blogService.remove(id);
    } 

    const blog = await this.blogService.findOne(id);
  
    if (!blog || !blog.author || !blog.author.id) {
      throw new Error('Blog or author not found');
    }
  
    if (blog.author.id.toString() !== user._id.toString()) {
      throw new Error('You are not authorized to delete this post');
    }
  
    return this.blogService.remove(id);
  }
  

  @Query(() => BlogPagination)
  async getAllBlogs(
    @Args('filter', { nullable: true }) filter: Record<string, any>,
    @Args('limit', { nullable: true }) limit: number,
    @Args('offset', { nullable: true }) offset: number,
  ): Promise<{ blogs: Blog[]; totalCount: number }> {
    return this.blogService.getAllBlogs(filter, limit, offset);
  }
}

