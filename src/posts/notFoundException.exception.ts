import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('NotFoundException', HttpStatus.NOT_FOUND);
  }
}
