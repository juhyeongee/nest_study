import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}
//nest g resouce를 통해 만듦
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('post')
  getPost(): Post {
    return {
      author: "newjeans officail",
      title: "민지",
      content: "ㅇ예아",
      likeCount: 9999,
      commentCount: 100000
    }
  }
}
