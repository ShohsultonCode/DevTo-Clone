import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import Post from 'src/models/post.schema';
import PostSchemaType from 'src/types/posts/posts.type.schema';
import UserSchemaType from 'src/types/users.types/user.type';
import { any } from 'webidl-conversions';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly Post: Model<PostSchemaType>,
  ) {}
  async create(body: CreatePostDto, req): Promise<PostSchemaType> {
    const { post_content, post_title } = body;
    const userId = req.user.userId;

    const newPost = await this.Post.create({
      post_title: post_title.toLowerCase(),
      post_content,
      post_author: userId,
    });

    return newPost;
  }

  async findAll(): Promise<PostSchemaType[]> {
    const posts = await this.Post.find()
      .populate({
        path: 'post_comments',
        select: 'comment_author',
        populate: {
          path: 'comment_author',
          select: 'user_username _id',
        },
      })
      .populate({
        path: 'post_likes',
        select: 'like_user',
        populate: {
          path: 'like_user',
          select: 'user_username _id',
        },
      })
      .populate({
        path: 'post_views',
        select: 'view_user',
        populate: {
          path: 'view_user',
          select: 'user_username _id',
        },
      })
      .exec();

    return posts;
  }

  async findOne(id: string): Promise<PostSchemaType | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const post = await this.Post.findById(id)
      .populate({
        path: 'post_comments',
        select: 'comment_author',
        populate: {
          path: 'comment_author',
          select: 'user_username _id',
        },
      })
      .populate({
        path: 'post_likes',
        select: 'like_user',
        populate: {
          path: 'like_user',
          select: 'user_username _id',
        },
      })
      .populate({
        path: 'post_views',
        select: 'view_user',
        populate: {
          path: 'view_user',
          select: 'user_username _id',
        },
      })
      .exec();

    if (!post || post.isDeleted == true) {
      throw new HttpException('Post Not Found', HttpStatus.BAD_REQUEST);
    }

    return post;
  }

  async update(id: number, body: UpdatePostDto): Promise<PostSchemaType> {
    const { post_title, post_content } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const checkPost = await this.Post.findById(id);

    if (!checkPost || checkPost.isDeleted == true) {
      throw new HttpException('Post Not Found', HttpStatus.BAD_REQUEST);
    }

    const post = await this.Post.findByIdAndUpdate(
      id,
      {
        post_title: post_title.toLowerCase(),
        post_content: post_content,
      },
      { new: true },
    );

    return post;
  }

  async remove(id: number): Promise<PostSchemaType> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const checkPost = await this.Post.findById(id);

    if (!checkPost || checkPost.isDeleted == true) {
      throw new HttpException('Post Not Found', HttpStatus.BAD_REQUEST);
    }

    const post = await this.Post.findByIdAndDelete(id);
    return post;
  }
}
