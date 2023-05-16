import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/guards.guard';
import { BoardsService } from './boards.service';
import { CommentDto } from './dto/comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Post('like/post/:id')
  like(@Param('id') id: string, @Req() req: any) {
    return this.boardsService.likePost(id, req);
  }

  @Delete('unlike/post/:id')
  unlike(@Param('id') id: string, @Req() req: any) {
    return this.boardsService.unLikePost(id, req);
  }

  @Post('comment/post/:id')
  commentPost(
    @Body() commentData: CommentDto,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.boardsService.commentPost(id, req, commentData);
  }

  @Delete('uncomment/:commentid/post/:id')
  uncommentPost(
    @Param('id') id: string,
    @Param('commentid') commentid: string,
    @Req() req: any,
  ) {
    return this.boardsService.uncommentPost(id, commentid, req);
  }

  @Get('view/post/:id')
  view(@Param('id') id: string, @Req() req: any) {
    return this.boardsService.view(id, req);
  }
}
