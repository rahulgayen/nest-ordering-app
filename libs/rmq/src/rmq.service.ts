import { BasicService } from '@app/common/basic/basic.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService, private readonly basicService: BasicService) {}
  getOptions(queue: string, noAck = false) {
    console.log(this.basicService.getBasicHelp());
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<'string'>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        queueOptions: {
          durable: false,
        },
        noAck,
      },
    };
  }
}
