import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RmqModuleOptions } from './interfaces/rmq-module-options.interface';

import { ConfigurableModuleClass } from './rmq-module-definition';
import { RmqService } from './rmq.service';

/* @Module({
  imports: [],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule extends ConfigurableModuleClass {
  static register(options: RmqModuleOptions): DynamicModule {
    return {
      ...super.register(options),
    };
  }
  static registerAsync(options: RmqModuleOptions): DynamicModule {
    return {
      imports: [
        ClientsModule.registerAsync([
          {
            name: options.name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${options.name}_QUEUE`),
                queueOptions: {
                  durable: false,
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      ...super.registerAsync(options),
    };
  }
} */
@Module({ providers: [RmqService], exports: [RmqService] })
export class RmqModule {
  public static register(options: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: options.name,
            useFactory: (configService: ConfigService) => {
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [configService.get<string>('RABBIT_MQ_URI')],
                  queue: configService.get<string>(`RABBIT_MQ_${options.name}_QUEUE`),
                },
                queueOptions: {
                  durable: true,
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
