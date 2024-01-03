import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DeletePostsGuard implements CanActivate {
  constructor(private readonly databaseService: DatabaseService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = parseInt(request.url.split('/').slice(-1));
    const post = this.databaseService.getOnePost(postId);
    return post
      .then((data) => {
        if (data.length > 0) return true;
        return false;
      })
      .catch(() => {
        return false;
      });
  }
}
