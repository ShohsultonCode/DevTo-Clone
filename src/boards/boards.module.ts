import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import posts from 'src/models/post.schema';
import { JwtModule } from '@nestjs/jwt';
import likes from 'src/models/like.schema';
import comments from 'src/models/comment.schema';
import views from 'src/models/views.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Posts', schema: posts },
      { name: 'Likes', schema: likes },
      { name: 'Comments', schema: comments },
      { name: 'Views', schema: views },
    ]),
    SharedModule,
    JwtModule.register({
      global: true,
      secret: '$2a$12$ofKffPiGvvVOE21ClTRo1OJPPgA6HpX3/jIHoTPBopb/cIcZ2r9g2',
      signOptions: { expiresIn: '7h' },
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
