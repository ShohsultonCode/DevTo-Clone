import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  user_name: string;

  @IsString()
  user_username: string;

  @IsString()
  user_password: string;
}
