import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsPipe } from './posts.pipe';
import { DeletePostsGuard } from './delete-posts.guard';
import { PostsInterceptor } from './posts.interceptor';
import { NotFoundException } from './notFoundException.exception';
import { NotFoundFilter } from './notfoundfilter.filter';

export type Post = any;

@Controller('posts')
@UseInterceptors(PostsInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('fetch')
  async getAllPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }
  @Get('fetch/:postid')
  async getOnePost(
    @Param('postid', ParseIntPipe) postId: number,
  ): Promise<Post> {
    return this.postsService.getOnePost(postId);
  }
  @Delete('delete/:postid')
  @UseGuards(DeletePostsGuard)
  async deleteOnePost(
    @Param('postid', ParseIntPipe) postId: number,
  ): Promise<Post> {
    return this.postsService.deleteOnePost(postId);
  }
  @Post('create')
  async addPost(@Body(PostsPipe) body: Record<string, any>): Promise<boolean> {
    return this.postsService.addPost(body);
  }
  @Put('update/:postid')
  async updatePost(
    @Param('postid', ParseIntPipe) postId: number,
    @Body() body: Record<string, any>,
  ): Promise<Post> {
    return this.postsService.updatePost(postId, body);
  }
  @Get('search')
  async search(@Query('s') searchQuery: string): Promise<Post[]> {
    return this.postsService.search(searchQuery);
  }
  @All('*')
  @UseFilters(NotFoundFilter)
  notFoundError() {
    throw new NotFoundException();
  }
}
