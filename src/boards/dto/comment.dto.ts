import { IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  comment_content: string;
}
