import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  upload(file: Express.Multer.File) {
    return `http://localhost:3000/${file.path}`;
  }
}
