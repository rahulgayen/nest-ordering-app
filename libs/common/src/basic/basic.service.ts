import { Injectable } from '@nestjs/common';

@Injectable()
export class BasicService {
  getBasicHelp() {
    return 'came to help you';
  }
}
