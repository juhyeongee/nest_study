import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//하지만 앱 컨트롤러에 엔드포인트를 구현하는 경우는 없을 것이다 
//모델별로 모듈을 만들어서 사용하게 됨 
interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}


//Controller안에 넣은 텍스트는 (aa)아래의 엔드포인트에 입력된 패스들 모두에게 중첩된다.
//aa/post 아래의 예시같은 경우

//app Controller에 엔드포인트를 만드는 경우는 굉장히 드물다 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
