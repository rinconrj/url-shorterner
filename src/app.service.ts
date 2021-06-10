import { HttpException, Injectable } from '@nestjs/common';
import { isUri } from 'valid-url';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './schema/url.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: Model<UrlDocument>,
    private configService: ConfigService,
  ) {}
  async url(longUrl): Promise<string | void> {
    const baseUrl = this.configService.get<string>('BASE_URL');

    if (!isUri(baseUrl)) {
      throw new HttpException('Invalid base URL', 401);
    }
    const urlCode = this._getId(6);

    if (isUri(longUrl)) {
      let url = await this.urlModel.findOne({
        longUrl,
      });

      if (url) {
        return url.shortUrl;
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new this.urlModel({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        return url.shortUrl;
      }
    } else {
      throw new HttpException('Invalid long URL', 401);
    }
  }
  async getUrl(code: string): Promise<string | void> {
    const url = await this.urlModel.findOne({
      urlCode: code,
    });
    if (url) {
      return url.longUrl;
    }
    throw new HttpException('No URL Found', 404);
  }

  _getId(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-$#!';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
