import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogService {
  findById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  // Create new blog
  async create(createBlogInput: CreateBlogInput): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogInput);
    const savedBlog = await newBlog.save();
    return savedBlog;
  }

   // Fetch all blogs
   async findAll(): Promise<Blog[]> {
    const blogs = await this.blogModel.find().exec();
    if (!blogs || blogs.length === 0) {
      throw new NotFoundException("No blogs found");
    }
    return blogs;
  }

  // Fetch a single blog by ID
  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).populate('author').exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // update the blog data by id
  async update(id: string, updateFields: Partial<UpdateBlogInput>): Promise<Blog> {
    console.log("data", id, updateFields);
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateFields, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  // delete the blog by id
  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return deletedBlog;
  }
  

  async getAllBlogs(filter?: Record<string, any>, limit?: number, offset?: number): Promise<{ blogs: Blog[]; totalCount: number }> {
    const query = filter || {};
    const blogs = await this.blogModel.find(query).skip(offset || 0).limit(limit || 10).exec();
    const totalCount = await this.blogModel.countDocuments(query).exec();
    return { blogs, totalCount };
  }
}
