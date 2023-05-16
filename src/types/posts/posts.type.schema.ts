import { Document, Types } from 'mongoose';

interface PostSchemaType extends Document {
  post_title: string;
  post_content: string;
  post_author: Types.ObjectId;
  post_comments: Types.ObjectId[];
  post_likes: Types.ObjectId[];
  post_views: Types.ObjectId[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export default PostSchemaType;
