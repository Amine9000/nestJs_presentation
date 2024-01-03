import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Post } from './posts.controller';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAllPosts(): Promise<Post[]> {
    return this.databaseService.getAllPosts();
  }
  async getOnePost(postId: number): Promise<Post> {
    return this.databaseService.getOnePost(postId);
  }
  async deleteOnePost(postId: number): Promise<boolean> {
    return this.databaseService.deleteOnePost(postId);
  }
  async addPost(body: Record<string, any>): Promise<boolean> {
    return this.databaseService.addPost(body);
  }
  async updatePost(
    postId: number,
    body: Record<string, any>,
  ): Promise<boolean> {
    return this.databaseService.updatePost(postId, body);
  }
  async search(searchQuery: string): Promise<Post[]> {
    const posts = await this.databaseService.getAllPosts();
    return posts.filter((post) => post.body.includes(searchQuery));
  }
}
