import { Controller, Get, Ip, Param, Res } from '@nestjs/common';
import { UrlsService } from './urls/urls.service';
import { Response } from 'express';

@Controller('/')
export class AppController {

  constructor(
    private readonly urlService: UrlsService
  ){}

  @Get(':shortenedTail')
  async dealWithShortenedURL(@Param() params: { shortenedTail: string }, @Res() response: Response, @Ip() ip_address: string) {
    // this will recieive the shortened url request
    // and possibly reroute into og url
    const originalURL = await this.urlService.checkShortenedURL(params.shortenedTail, ip_address)
    return response.redirect(originalURL)
  }
}
