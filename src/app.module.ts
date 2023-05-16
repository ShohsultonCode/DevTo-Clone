import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { BoardsModule } from './boards/boards.module';
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), AuthModule, SharedModule, PostsModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
