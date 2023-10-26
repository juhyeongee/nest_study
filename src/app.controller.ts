import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}


//Controller안에 넣은 텍스트는 (aa)아래의 엔드포인트에 입력된 패스들 모두에게 중첩된다.
//aa/post 아래의 예시같은 경우는
@Controller('aa')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
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
