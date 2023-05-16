import { Document, Schema, Types } from 'mongoose';

interface CommentSchemaType extends Document {
  comment_content: string;
  comment_author: Types.ObjectId;
  comment_post: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export default CommentSchemaType;