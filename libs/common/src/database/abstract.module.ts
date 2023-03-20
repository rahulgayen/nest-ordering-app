import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get<string>('MONGO_CONNECTION_URI') };
      },
      inject: [ConfigService],
    }),
  ]
})
export class DatabaseModule {}
