import { Injectable } from '@nestjs/common';
import { Post } from 'src/posts/posts.controller';
import { promises as fsPromises } from 'fs';

@Injectable()
export class DatabaseService {
  private readonly JSON_FILE_PATH =
    '/home/amine/All/Lab/NestJs/first-app/src/database/database.json';
  async getAllPosts(): Promise<Post[]> {
    const data = await fsPromises.readFile(this.JSON_FILE_PATH, 'utf8');
    return JSON.parse(data).posts as Post[];
  }
  async getOnePost(postId: number): Promise<Post> {
    const data = await fsPromises.readFile(this.JSON_FILE_PATH, 'utf8');
    return JSON.parse(data).posts.filter((post) => post.id == postId);
  }
  async deleteOnePost(postId: number): Promise<boolean> {
    try {
      const data = await fsPromises.readFile(this.JSON_FILE_PATH, 'utf8');
      const posts = JSON.parse(data).posts;
      const newPosts = posts.filter((post) => post.id != postId);
      const newData = { posts: newPosts };
      const json = JSON.stringify(newData);
      await fsPromises.writeFile(this.JSON_FILE_PATH, json);
      return true;
    } catch (err) {
      return false;
    }
  }
  async addPost(body: Record<string, any>): Promise<boolean> {
    try {
      const data = await fsPromises.readFile(this.JSON_FILE_PATH, 'utf8');
      const posts = JSON.parse(data).posts;
      posts.push(body);
      const newData = { posts: posts };
      const json = JSON.stringify(newData);
      await fsPromises.writeFile(this.JSON_FILE_PATH, json);
      return true;
    } catch (err) {
      return false;
    }
  }
  async updatePost(
    postId: number,
    body: Record<string, any>,
  ): Promise<boolean> {
    try {
      const data = await fsPromises.readFile(this.JSON_FILE_PATH, 'utf8');
      const posts = JSON.parse(data).posts;
      const newPosts = posts.map((post) => (post.id == postId ? body : post));
      const newData = { posts: newPosts };
      const json = JSON.stringify(newData);
      await fsPromises.writeFile(this.JSON_FILE_PATH, json);
      return true;
    } catch (err) {
      return false;
    }
  }
}
