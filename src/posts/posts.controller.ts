import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/guards/guards.guard';
  @UseGuards(JwtAuthGuard)
  @Controller('posts')
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('/create/post')
    async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
      return await this.postsService.create(createPostDto, req);
    }

    @Get('/get/posts')
    findAll() {
      return this.postsService.findAll();
    }

    @Get('/get/post/:id')
    findOne(@Param('id') id: string) {
      return this.postsService.findOne(id);
    }

    @Patch('/update/post/:id')
    update(@Param('id') id: any, @Body() updatePostDto: UpdatePostDto) {
      return this.postsService.update(id, updatePostDto);
    }

    @Delete('/delete/post/:id')
    remove(@Param('id') id: any) {
      return this.postsService.remove(id);
    }
  }
