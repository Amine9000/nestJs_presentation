import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PostsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `operation for ${request.originalUrl} toke ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
