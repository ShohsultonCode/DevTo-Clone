import { Document, Schema, Types } from 'mongoose';

interface ViewSchemaType extends Document {
  view_user: Types.ObjectId;
  view_post: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default ViewSchemaType;
