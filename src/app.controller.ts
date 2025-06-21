import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlsService } from './urls/urls.service';
import { Response } from 'express';

@Controller('/')
export class AppController {

  constructor(
    private readonly urlService: UrlsService
  ){}

  @Get(':shortenedTail')
  async dealWithShortenedURL(@Param() params: { path: string }, @Res() response: Response) {
    // this will recieive the shortened url request
    // and possibly reroute into og url
    const shortenedURL = await this.urlService.checkShortenedURL(params.path)
    return response.redirect(shortenedURL.ogURL)
  }
}
