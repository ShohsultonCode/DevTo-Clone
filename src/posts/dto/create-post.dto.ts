import { IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  post_title: string;

  @IsString()
  post_content: string;
}
