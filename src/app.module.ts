import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Url, UrlSchema } from './schema/url.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('MONGO_USER');
        const pass = configService.get<string>('MONGO_PASS');
        const bd = configService.get<string>('MONGO_DB');
        const uri = `mongodb://${user}:${pass}@13.58.249.186:27017/${bd}`;
        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
