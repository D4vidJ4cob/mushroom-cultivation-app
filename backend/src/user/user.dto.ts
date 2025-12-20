import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'nestjs-swagger-dto';

export class RegisterUserRequestDto {
  @IsString({ name: 'name', minLength: 2, maxLength: 255 })
  name: string;

  @IsString({ name: 'email', example: 'user@email.com' })
  @IsEmail()
  email: string;

  @IsString({ name: 'password', minLength: 8, maxLength: 128 })
  password: string;
}

export class UpdateUserRequestDto {
  @IsString({ name: 'name', minLength: 2, maxLength: 255 })
  name?: string;

  @IsString({
    name: 'email',
    example: 'user@email.com',
  })
  @IsEmail()
  email?: string;
}

export class PublicUserResponseDto {
  @ApiProperty({
    description: 'User ID',
    minimum: 1,
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'User name',
    minLength: 2,
    maxLength: 255,
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@email.com',
    type: 'string',
    format: 'email',
  })
  @Expose()
  email: string;
}

export class UserListResponseDto {
  @ApiProperty({ type: () => [PublicUserResponseDto] })
  items: PublicUserResponseDto[];
}
