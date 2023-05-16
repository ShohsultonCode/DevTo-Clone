import { Schema } from 'mongoose';
const users = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_username: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      default: 'user',
      required: true,
    },
    user_posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        default: 0,
      },
    ],
    user_published_posts_count: {
      type: Number,
      required: true,
      default: 0,
    },
    user_posts_comments_count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default users;
