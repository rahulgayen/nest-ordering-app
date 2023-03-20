import { BasicModule } from '@app/common/basic/basic.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './rmq-module-definition';
import { RmqService } from './rmq.service';

@Module({
  imports: [BasicModule],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    console.log({ imports: [MongooseModule], ...super.registerAsync(options) }, 'registerAsync RMQ MODULE');
    return {
      imports: [BasicModule],
      ...super.registerAsync(options),
    };
  }
}
