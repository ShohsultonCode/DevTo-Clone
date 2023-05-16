import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import posts from 'src/models/post.schema';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: posts }]),
    SharedModule,
    JwtModule.register({
      global: true,
      secret: '$2a$12$ofKffPiGvvVOE21ClTRo1OJPPgA6HpX3/jIHoTPBopb/cIcZ2r9g2',
      signOptions: { expiresIn: '7h' },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
