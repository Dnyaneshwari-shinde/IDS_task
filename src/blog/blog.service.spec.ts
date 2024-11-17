import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Role } from 'src/auth/enums/role.enums';

describe('BlogService', () => {
  let service: BlogService;
  let blogModel: Model<Blog>;

  const mockBlog = {
    title: 'Test Blog',
    content: 'Test Content',
    author: 'AuthorID123',
  };

  const mockBlogModel = {
    create: jest.fn().mockResolvedValue(mockBlog),
    find: jest.fn().mockResolvedValue([mockBlog]),
    findById: jest.fn().mockResolvedValue(mockBlog),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockBlog),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockBlog),
    countDocuments: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(Blog.name),
          useValue: mockBlogModel,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    blogModel = module.get<Model<Blog>>(getModelToken(Blog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog', async () => {
      const createBlogInput: CreateBlogInput = {
        title: "Test Blog",
        content: "Test Content",
        author: {
          id: "101",
          username: "ds",
          email: "email@gmail.com",
          role: Role.ADMIN  
        },
      };

      mockBlogModel.create.mockResolvedValue(createBlogInput);

      const result = await service.create(createBlogInput);
      expect(result).toEqual(createBlogInput);
      expect(mockBlogModel.create).toHaveBeenCalledWith(createBlogInput);
    });
  });

  describe('findAll', () => {
    it('should return an array of blogs', async () => {
      mockBlogModel.find.mockResolvedValue([mockBlog]);
  
      const result = await service.findAll();
      expect(result).toEqual([mockBlog]);
      expect(mockBlogModel.find).toHaveBeenCalled();
    });
  
    it('should throw NotFoundException if no blogs are found', async () => {
      mockBlogModel.find.mockResolvedValue([]);
  
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single blog by ID', async () => {
      const blogId = '1';
      mockBlogModel.findById.mockResolvedValue(mockBlog);
  
      const result = await service.findOne(blogId);
      expect(result).toEqual(mockBlog);
      expect(mockBlogModel.findById).toHaveBeenCalledWith(blogId);
    });
  
    it('should throw NotFoundException if the blog is not found', async () => {
      const blogId = '1';
      mockBlogModel.findById.mockResolvedValue(null);
  
      await expect(service.findOne(blogId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the blog and return the updated blog', async () => {
      const blogId = '1';
      const updateFields: Partial<UpdateBlogInput> = { title: 'Updated Blog' };
      const updatedBlog = { ...mockBlog, ...updateFields };
  
      mockBlogModel.findByIdAndUpdate.mockResolvedValue(updatedBlog);
  
      const result = await service.update(blogId, updateFields);
      expect(result).toEqual(updatedBlog);
      expect(mockBlogModel.findByIdAndUpdate).toHaveBeenCalledWith(
        blogId,
        updateFields,
        { new: true }
      );
    });
  
    it('should throw NotFoundException if the blog to update is not found', async () => {
      const blogId = '1';
      const updateFields: Partial<UpdateBlogInput> = { title: 'Updated Blog' };
  
      mockBlogModel.findByIdAndUpdate.mockResolvedValue(null);
  
      await expect(service.update(blogId, updateFields)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete the blog and return the deleted blog', async () => {
      const blogId = '1';
  
      mockBlogModel.findByIdAndDelete.mockResolvedValue(mockBlog);
  
      const result = await service.remove(blogId);
      expect(result).toEqual(mockBlog);
      expect(mockBlogModel.findByIdAndDelete).toHaveBeenCalledWith(blogId);
    });
  
    it('should throw NotFoundException if the blog to delete is not found', async () => {
      const blogId = '1';
  
      mockBlogModel.findByIdAndDelete.mockResolvedValue(null);
  
      await expect(service.remove(blogId)).rejects.toThrow(NotFoundException);
    });
  });
})






