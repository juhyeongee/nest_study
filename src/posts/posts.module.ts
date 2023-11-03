import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([
    PostsModel,
  ])],
  //모델에 해당되는 레포지토리를 주입할 때 (외워야함)
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
