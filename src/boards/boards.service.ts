import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import CommentSchemaType from 'src/types/posts/comment.type';
import LikeSchemaType from 'src/types/posts/likes.types';
import PostSchemaType from 'src/types/posts/posts.type.schema';
import ViewSchemaType from 'src/types/posts/view.type';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Posts') private readonly Post: Model<PostSchemaType>,
    @InjectModel('Likes') private readonly Like: Model<LikeSchemaType>,
    @InjectModel('Comments') private readonly Comment: Model<CommentSchemaType>,
    @InjectModel('Views') private readonly View: Model<ViewSchemaType>,
  ) {}

  async likePost(id: string, req): Promise<Record<string, string>> {
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const post = await this.Post.findById(id);

    if (!post || post.isDeleted == true) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    // check if the user has already liked the post
    const existingLike = await this.Like.findOne({
      like_post: id,
      like_user: userId,
    });

    if (existingLike) {
      throw new HttpException(
        'You have already like this post',
        HttpStatus.BAD_REQUEST,
      );
    }
    // create a new like document
    const newLike = await new this.Like({ like_post: id, like_user: userId });
    await newLike.save();

    if (!Array.isArray(post.post_likes)) {
      post.post_likes = [];
    }

    post.post_likes.push(newLike._id);
    await post.save();

    return { message: 'You succsesfuly liked this post' };
  }

  async unLikePost(id: string, req): Promise<Record<string, string>> {
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const post = await this.Post.findById(id);

    if (!post || post.isDeleted == true) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    // check if the user has already liked the post
    const existingLike = await this.Like.findOne({
      like_post: id,
      like_user: userId,
    });

    if (!existingLike) {
      throw new HttpException(
        'You do not have like this post',
        HttpStatus.BAD_REQUEST,
      );
    }
    // remove the like from the post
    const removedLike = await this.Like.findByIdAndDelete(existingLike._id);
    // remove the like from the post_likes array of the post document
    await this.Post.updateOne(
      { _id: id },
      { $pull: { post_likes: existingLike._id } },
    );

    return { message: 'You succsesfuly unliked this post' };
  }

  async commentPost(
    id: string,
    req,
    body: CommentDto,
  ): Promise<Record<string, string>> {
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }
    const post = await this.Post.findById(id);
    const { comment_content } = body;

    if (!post || post.isDeleted == true) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }

    const newComment = await new this.Comment({
      comment_post: id,
      comment_author: userId,
      comment_content: comment_content,
    });
    await newComment.save();

    if (!Array.isArray(post.post_comments)) {
      post.post_comments = [];
    }

    post.post_comments.push(newComment._id);

    await post.save();
    return { message: 'You succsesfuly commented this post' };
  }

  async uncommentPost(
    id: string,
    commentid: string,
    req,
  ): Promise<Record<string, string>> {
    const userId = req.user.userId;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(commentid)
    ) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }

    const post = await this.Post.findById(id);
    const comment = await this.Comment.findById(commentid);

    if (
      !post ||
      post.isDeleted == true ||
      !comment ||
      comment.isDeleted == true
    ) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }

    const removedComment = await this.Comment.findByIdAndDelete(commentid);

    await this.Post.updateOne(
      { _id: id },
      { $pull: { post_comments: new Types.ObjectId(commentid) } },
    );

    return { message: 'You succsesfuly uncommented this post' };
  }

  async view(id: string, req): Promise<Record<string, string>> {
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }

    const post = await this.Post.findById(id);

    if (!post || post.isDeleted == true) {
      throw new HttpException('ID is not valid', HttpStatus.BAD_REQUEST);
    }

    const existingView = await this.View.findOne({
      view_post: id,
      view_user: userId,
    });

    if (existingView) {
      return { message: 'You have already viewed this post' };
    }

    const view = await new this.View({
      view_post: id,
      view_user: userId,
    });

    // Save view to database
    await view.save();

    // Update the post views count
    post.post_views.push(view._id);
    await post.save();

    return { message: 'Success' };
  }
}
