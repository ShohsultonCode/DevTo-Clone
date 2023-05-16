import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDTO {
  @IsString()
  user_username: string;

  @IsString()
  user_password: string;
}
