import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private logger = new Logger(BillingService.name, { timestamp: true });
  getHello(): string {
    return 'Hello World!';
  }
  bill(data) {
    this.logger.log('Billing...', data);
  }
}
