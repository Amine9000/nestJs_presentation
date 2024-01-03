import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';

@Injectable()
export class PostsMiddleware implements NestMiddleware {
  private readonly LOG_FILE_PATH =
    '/home/amine/All/Lab/NestJs/first-app/src/logs/log.txt';
  async use(req: Request, res: Response, next: () => void) {
    try {
      const data = `${req.method} : ${
        req.originalUrl
      } : ${new Date().toUTCString()}\n`;
      await fsPromises.appendFile(this.LOG_FILE_PATH, data);
      next();
    } catch (err) {
      next();
    }
  }
}
