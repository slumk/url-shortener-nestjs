import { ApiProperty } from '@nestjs/swagger';
import { UserService } from 'src/users/users.service';

export class LoginDto {
  @ApiProperty({ default: UserService.ADMIN_ACCOUNT_EMAIL })
  email: string;
  @ApiProperty({ default: UserService.ADMIN_ACCOUNT_PASSWORD })
  password: string;
}

export class LoginResponseTypeDTO {
  @ApiProperty()
  readonly token: string;
  @ApiProperty({
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      timestamp: {
        type: 'string',
      },
    },
  })
  readonly userData: {
    id: string;
    email: string;
    timestamp: Date;
  };
}

export class ProfileDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
}

export class JWTPayload {
  sessionId: string;
  userId: string;
  timestamp: string;
}

export class UpdatePasswordParamsDTO {
  @ApiProperty()
  currentPassword: string;
  @ApiProperty()
  newPassword: string;
}
