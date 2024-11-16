// import { Injectable } from '@nestjs/common';
// import { CreateBlogInput } from './dto/create-blog.input';
// import { UpdateBlogInput } from './dto/update-blog.input';

// @Injectable()
// export class BlogService {
//   create(createBlogInput: CreateBlogInput) {
//     return 'This action adds a new blog';
//   }

//   findAll() {
//     return {
//       id : 201,
//       title : "Heros of wars",
//       content : "heros life story",
//       author :  { id: '1', username: 'alice', email: 'alice@example.com', password: 'secret', role: 'admin' },
//       createdAt : "rigth now",
//       updatedAt : "last"
//     }
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} blog`;
//   }

//   update(id: number, updateBlogInput: UpdateBlogInput) {
//     return `This action updates a #${id} blog`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} blog`;
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async create(createBlogInput: CreateBlogInput): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogInput);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogInput: UpdateBlogInput): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogInput, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return deletedBlog;
  }
}
