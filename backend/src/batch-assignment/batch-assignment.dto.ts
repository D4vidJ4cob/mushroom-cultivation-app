import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { SubstrateResponseDto } from '../substrate/substrate.dto';
import { PublicUserResponseDto } from '../user/user.dto';

export class CreateBatchAssignmentRequestDto {
  @IsEnum(['manager', 'worker'])
  role: 'manager' | 'worker';

  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  substrateId: number;
}

export class UpdateBatchAssignmentRequestDto extends PartialType(
  CreateBatchAssignmentRequestDto,
) {}

export class BatchAssignmentResponseDto {
  id: number;
  role: 'manager' | 'worker';
  userId: number;
  substrateId: number;
}

export class BatchAssignmentDetailResponseDto extends BatchAssignmentResponseDto {
  user: PublicUserResponseDto;
  substrate?: SubstrateResponseDto;
}

export class BatchAssignmentListResponseDto {
  items: BatchAssignmentDetailResponseDto[];
}
