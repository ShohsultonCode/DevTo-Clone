import { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    post_title: {
      type: String,
      required: true,
    },
    post_content: {
      type: String,
      required: true,
    },
    post_author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },

    post_comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
        default: 0,
      },
    ],
    post_likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Likes',
        default: 0,
      },
    ],
    post_views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Views',
        default: 0,
      },
    ],
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

export default postSchema;
