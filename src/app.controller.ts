import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlsService } from './urls/urls.service';
import { Response } from 'express';

@Controller('/')
export class AppController {

  constructor(
    private readonly urlService: UrlsService
  ){}

  @Get(':shortenedTail')
  async dealWithShortenedURL(@Param() params: { shortenedTail: string }, @Res() response: Response) {
    // this will recieive the shortened url request
    // and possibly reroute into og url
    const originalURL = await this.urlService.checkShortenedURL(params.shortenedTail)
    return response.redirect(originalURL)
  }
}
