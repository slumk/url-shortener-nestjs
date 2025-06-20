import { CreateUrlDto } from './create-url.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
