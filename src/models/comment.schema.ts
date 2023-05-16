import { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: true,
    },
    comment_author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    comment_post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export default commentSchema;
