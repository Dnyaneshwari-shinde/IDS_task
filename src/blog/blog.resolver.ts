// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { BlogService } from './blog.service';
// import { CreateBlogInput } from './dto/create-blog.input';
// import { UpdateBlogInput } from './dto/update-blog.input';

// @Resolver('Blog')
// export class BlogResolver {
//   constructor(private readonly blogService: BlogService) {}

//   @Mutation('createBlog')
//   create(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
//     return this.blogService.create(createBlogInput);
//   }

//   @Query('getBlog')
//   findAll() {
//     return this.blogService.findAll();
//   }

//   @Query('blog')
//   findOne(@Args('id') id: number) {
//     return this.blogService.findOne(id);
//   }

//   @Mutation('updateBlog')
//   update(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
//     return this.blogService.update(updateBlogInput.id, updateBlogInput);
//   }

//   @Mutation('removeBlog')
//   remove(@Args('id') id: number) {
//     return this.blogService.remove(id);
//   }
// }


import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './schema/blog.schema';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog)
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  // @Query(() => [Blog], { name: 'blogs' })
  // async findAll() {
  //   return this.blogService.findAll();
  // }

  // @Query(() => Blog, { name: 'blog' })
  // async findOne(@Args('id') id: string) {
  //   return this.blogService.findOne(id);
  // }

  // @Mutation(() => Blog)
  // async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
  //   return this.blogService.update(updateBlogInput.id, updateBlogInput);
  // }

  // @Mutation(() => Blog)
  // async removeBlog(@Args('id') id: string) {
  //   return this.blogService.remove(id);
  // }
}

