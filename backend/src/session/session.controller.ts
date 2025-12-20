import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from './session.dto';
import { Public } from '../auth/decorators/public.decorator';
import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'login',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @UseInterceptors(AuthDelayInterceptor)
  @Public()
  @Post()
  async signIn(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(dto);
    return { token };
  }
}
