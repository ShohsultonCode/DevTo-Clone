import { Schema } from 'mongoose';

const likeSchema = new Schema(
  {
    like_user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    like_post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default likeSchema;
