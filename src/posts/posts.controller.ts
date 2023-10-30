import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET / posts 
  // 모든 post를 다 가져온다.
  
  @Get()
  getPosts(){
    return this.postsService.getAllPosts();
  }

  // 2) GET / posts/:id
  // id에 해당되는 post를 가져온다 
  // 예를들어, id=1 인경우 id가 1인 포스트를 가져온다. 
  // Get(:id)를 통해 간단하게 패스파라미터를 설정할 수 있다.
  // @Param('id') id:string 에서 'id'(파라미터 이름)를 통해서 어떤 파라미터를 가져올지 명시함
  // /posts/:id/:name/:age 등 여러개의 파라미터를 쓸 수 있기 때문에 그런 경우에 유용함
  @Get(':id')
  getPost(@Param('id') id:string ){
    return this.postsService.getPostById(+id);
  }
  //
  // 3) POST / posts
  //  POST를 생성한다
  @Post()
  postPosts(
    @Body('author') author:string, 
    @Body('title') title: string,
    @Body('content') content: string, 
  ){
      return this.postsService.createPost(author, title, content);
  }
  // 4) PATCH / posts
  //   POST를 변경한다 

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?:string, 
    @Body('title') title?: string,
    @Body('content') content?: string, 
  ){
     return this.postsService.updatePost(id,author, content, title);
  }

  // 5) DELETE /posts/:id 
  //    id에 해당되는 POST를 삭제한다. 

  @Delete(':id')
  deletePost(@Param('id') id:string){
    return this.postsService.deletePost(id);
  }
}
