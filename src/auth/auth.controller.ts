import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseTypeDTO,
  ProfileDTO
} from './dto/user.dto';
import { RequestWithUser } from './types/request_with_user';
import { ProtectRoute } from './guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponseTypeDTO })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseTypeDTO> {
    return await this.service.validateLogin(loginDto);
  }

  @ProtectRoute()
  @Get('profile')
  @ApiOkResponse({ type: ProfileDTO })
  async getProfile(@Req() req: RequestWithUser): Promise<ProfileDTO> {
    return {
      id: req.user.id,
      email: req.user.email
    };
  }

  @ProtectRoute()
  @Post('logout')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        loggedOut: {
          type: 'boolean',
        },
      },
    },
  })
  async logout(@Req() req: RequestWithUser) {
    try {
      await this.service.logout(req.user.id);
      return { loggedOut: true };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
