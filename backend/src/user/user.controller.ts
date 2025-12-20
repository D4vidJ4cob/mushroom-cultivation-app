import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  // UseInterceptors,
} from '@nestjs/common';
import {
  UpdateUserRequestDto,
  UserListResponseDto,
  PublicUserResponseDto,
  RegisterUserRequestDto,
} from './user.dto';
import { UserService } from './user.service';
import { LoginResponseDto } from '../session/session.dto';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/roles';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { CheckUserAccessGuard } from '../auth/guards/userAccess.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { type Session } from '../type/auth';
import { ParseUserIdPipe } from '../auth/pipes/parseUser.pipe';
// import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';
import {
  SubstrateAssignmentListResponseDto,
  SubstrateListResponseDto,
} from '../substrate/substrate.dto';
import { SubstrateService } from '../substrate/substrate.service';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly substrateService: SubstrateService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: UserListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(): Promise<UserListResponseDto> {
    return this.userService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by ID',
    type: PublicUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'me',
  })
  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<PublicUserResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return await this.userService.getById(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Register',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @Public()
  @UseInterceptors(AuthDelayInterceptor)
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @ApiResponse({
    status: 200,
    description: 'Update user by ID',
    type: PublicUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'me',
  })
  @Put(':id')
  @UseGuards(CheckUserAccessGuard)
  async updateUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    return await this.userService.updateById(id === 'me' ? user.id : id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete user',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'me',
  })
  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    return await this.userService.deleteById(id === 'me' ? user.id : id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all the substrates that a user made',
    type: SubstrateListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'me',
  })
  @Get(':id/substrate-assignments')
  async getSubstrateAssignments(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<SubstrateAssignmentListResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return this.substrateService.getAssignedSubstratesByUserId(userId);
  }
}
