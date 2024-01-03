import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PostsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!('id' in value) || !('body' in value)) throw new BadRequestException();
    return value;
  }
}
