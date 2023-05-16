import { Document, Schema, Types } from 'mongoose';

interface LikeSchemaType extends Document {
  like_user: Types.ObjectId;
  like_post: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default LikeSchemaType