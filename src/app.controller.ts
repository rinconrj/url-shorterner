import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  shorter(@Body() body: { longUrl: string }): Promise<string | void> {
    const { longUrl } = body;

    return this.appService.url(longUrl);
  }

  @Get(':id')
  @Redirect()
  async getUrl(@Param('id') id: string, @Res() res): Promise<any> {
    const longUrl = await this.appService.getUrl(id);
    console.log(longUrl);
    return { url: longUrl };
  }
}
