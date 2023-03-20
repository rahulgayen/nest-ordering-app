import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RmqModuleOptions } from './interfaces/rmq-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<RmqModuleOptions>().build();
