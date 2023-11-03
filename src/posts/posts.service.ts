import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }
  //nest g resouce를 통해 만듦
  

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>
    //레포지토리는 원하는 모델을 기반으로 데이터베이스와 소통하는 역할이다.
  ){}

    async getAllPosts(){
      //모든 repository의 함수는 비동기임 그래서 async 
      return this.postsRepository.find();
      //find - 특정 조건에 해당되는 모든 정보를 반환한다.
    }

    async getPostById(id:number){
      const post = await this.postsRepository.findOne({
        where: {
          id,
        },
      })
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


    async createPost(author: string, title: string, content: string){
      // 1) create -> 저장할 객체를 생성한다.
      // 2) save -> 객체를 저장한다 (create 메서드에서 생성한 객체로)
      const post = this.postsRepository.create({
        author,
        title,
        content,
        likeCount: 0,
        commentCount: 0, 
      });

      const newPost = await this.postsRepository.save(post);
      return newPost;
    }

    async updatePost(postId: number, author: string, title: string, content: string){
      // save의 기능
      // 1) 만약 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
      // 2) 만약 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트 한다.

      const post = await this.postsRepository.findOne({
        where: {
          id: postId ,
        }
      })
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

        const newPost = await this.postsRepository.save(post);
    
        return newPost;
    }

    async deletePost(postId:number )  {
      const post = this.postsRepository.findOne({
        where: {
          id : postId
        }
      })
        if(!post){
          throw new NotFoundException();
        }
        await this.postsRepository.delete(postId);
        return postId; 
    }
}
