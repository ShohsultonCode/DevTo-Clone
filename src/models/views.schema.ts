import { Schema } from 'mongoose';

const viewSchema = new Schema(
  {
    view_user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    view_post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default viewSchema