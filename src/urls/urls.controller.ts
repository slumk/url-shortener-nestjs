import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { User } from 'src/auth/decorators/current-user';
import { Users } from '@prisma/client';
import { ProtectRoute } from 'src/auth/guards/auth.guard';
import { ListURLParams } from './dto/list-url.dto';

@Controller('urls')
@ProtectRoute()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('/add')
  create(@Body() createUrlDto: CreateUrlDto, @User() user: Users) {
    return this.urlsService.create(createUrlDto, user.id)
  }

  @Get('/list')
  findAll(@Query() params: ListURLParams) {
    return this.urlsService.list(params);
  }

  @Post('/update')
  update(@Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(updateUrlDto.id, updateUrlDto);
  }

  @Post('/delete/:id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(id);
  }
}
