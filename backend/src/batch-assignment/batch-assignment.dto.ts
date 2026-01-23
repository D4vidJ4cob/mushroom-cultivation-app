import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { SubstrateResponseDto } from '../substrate/substrate.dto';
import { PublicUserResponseDto } from '../user/user.dto';

export class CreateBatchAssignmentRequestDto {
  @ApiProperty({
    example: 'manager',
    enum: ['manager', 'worker'],
    description: 'Role of the user in this batch assignment',
  })
  @IsEnum(['manager', 'worker'])
  role: 'manager' | 'worker';

  @ApiProperty({
    example: 1,
    description: 'ID of the user to assign',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the substrate to assign',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  substrateId: number;
}

export class UpdateBatchAssignmentRequestDto extends PartialType(
  CreateBatchAssignmentRequestDto,
) {}

export class BatchAssignmentResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({
    example: 'manager',
    enum: ['manager', 'worker'],
    description: 'Role of the user',
  })
  role: 'manager' | 'worker';

  @ApiProperty({ example: 1, description: 'ID of the assigned user' })
  userId: number;

  @ApiProperty({ example: 1, description: 'ID of the assigned substrate' })
  substrateId: number;
}

export class BatchAssignmentDetailResponseDto extends BatchAssignmentResponseDto {
  @ApiProperty({ type: () => PublicUserResponseDto })
  user: PublicUserResponseDto;

  @ApiProperty({
    type: () => SubstrateResponseDto,
    required: false,
    description: 'Substrate details if included',
  })
  substrate?: SubstrateResponseDto;
}

export class BatchAssignmentListResponseDto {
  @ApiProperty({ type: () => [BatchAssignmentDetailResponseDto] })
  items: BatchAssignmentDetailResponseDto[];
}
