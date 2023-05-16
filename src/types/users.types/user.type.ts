import { Document } from 'mongoose';

interface UserSchemaType extends Document {
  id: string;
  user_name: string;
  user_username: string;
  user_password: string;
  user_photo: string;
  user_role: string;
  created_at: Date;
  update_at: Date;
}

export default UserSchemaType;
