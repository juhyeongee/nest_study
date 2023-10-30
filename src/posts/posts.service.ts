import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }
  //nest g resouce를 통해 만듦
  
  let posts: PostModel[] = [
    {
      id:1 ,
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content : '메이크업 고치는 민지',
      likeCount : 100000,
      commentCount : 99999,
    },
    {
      id: 2 ,
      author: 'newjeans_official',
      title: '뉴진스 해린',
      content : '노래연습하는 해린',
      likeCount : 100000,
      commentCount : 99999,
    },
    {
      id: 3 ,
      author: 'blackpink_official',
      title: '로제',
      content : '공연하는 로제',
      likeCount : 100000,
      commentCount : 99999,
    }
  
  ]

@Injectable()
export class PostsService {

    getAllPosts(){
        return posts;
    }

    getPostById(id:number){
        const post =  posts.find((post)=> post.id === +id);
    if(!post){
      throw new NotFoundException();
    }
    //자주쓰는 Exception
    // 1. BadRequestException
    // 2. UnauthorizedException
    // 3. NotFoundException
    // 4. ForbiddenException

    return post;
    }


    createPost(author: string, title: string, content: string){
        const post : PostModel = {
            id: posts[posts.length -1].id + 1, 
            author : author, 
            title ,
            content,
            // key와 value가 같으면 생략해줄 수 있는 문법
            likeCount : 0 ,
            commentCount : 0 , 
          }
      
          posts = [
            ...posts,
            post
          ]; 
      
          return post;
    }

    updatePost(id: string, author: string, title: string, content: string){
        const post = posts.find(post => post.id === +id);
        if(!post){
          throw new NotFoundException();
        }
  
        if(author){
          post.author = author; 
        }
  
        if(title){
          post.title = title;
        }
        
        if(content){
          post.content = content;
        }
  
        posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost);
  
        return post;
    }

    deletePost(id:string )  {
        const post =  posts.find((post)=> post.id === +id);
        if(!post){
          throw new NotFoundException();
        }
        posts = posts.filter(post => post.id !== +id);
        return id; 
    }
}
