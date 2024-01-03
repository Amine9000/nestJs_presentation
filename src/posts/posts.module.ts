import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/database/database.module';
import { PostsMiddleware } from './posts.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostsMiddleware).forRoutes(PostsController);
  }
}
