import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, Max, Min } from 'class-validator';
import { IsBoolean, IsNumber } from 'nestjs-swagger-dto';
import { GrainSpawnResponseDto } from '../grain-spawn/grain-spawn.dto';

export class CreateSubstrateRequestDto {
  @IsNumber({ name: 'grainSpawnId', min: 1 })
  grainSpawnId: number;

  @IsDateString()
  inoculationDate: string;

  @IsDateString()
  @IsOptional()
  incubationDate?: string;

  @IsBoolean({ name: 'contaminationStatus' })
  @IsOptional()
  contaminationStatus?: boolean;

  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  quantity?: number;
}

export class UpdateSubstrateRequestDto extends PartialType(
  CreateSubstrateRequestDto,
) {}

export class SubstrateResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the substrate',
  })
  id: number;

  @ApiProperty({
    example: '2025-02-01T00:00:00.000Z',
    description: 'Date when substrate was inoculated',
    type: 'string',
    format: 'date-time',
  })
  inoculationDate: string;

  @ApiProperty({
    example: '2025-02-15T00:00:00.000Z',
    description: 'Date when substrate started incubation',
    nullable: true,
    type: 'string',
    format: 'date-time',
  })
  incubationDate: string | null;

  @ApiProperty({
    example: false,
    description: 'Contamination status of the substrate',
    nullable: true,
    type: 'boolean',
  })
  contaminationStatus: boolean | null;

  @ApiProperty({ example: 1, description: 'ID of the grain spawn used' })
  grainSpawnId: number;
}

export class SubstrateDetailResponseDto extends SubstrateResponseDto {
  @ApiProperty({ type: () => GrainSpawnResponseDto })
  grainSpawn: GrainSpawnResponseDto;
}

export class SubstrateListResponseDto {
  @ApiProperty({ type: () => [SubstrateResponseDto] })
  items: SubstrateResponseDto[];
}

export class SubstrateAssignmentResponseDto {
  @ApiProperty({ example: 1, description: 'Assignment ID' })
  id: number;

  @ApiProperty({
    example: 'manager',
    description: 'Role of the user',
    enum: ['manager', 'worker'],
  })
  role: 'manager' | 'worker';

  @ApiProperty({
    description: 'Substrate details',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      inoculationDate: {
        type: 'string',
        format: 'date-time',
        example: '2025-02-01T00:00:00.000Z',
      },
      contaminationStatus: { type: 'boolean', nullable: true, example: false },
    },
  })
  substrate: {
    id: number;
    inoculationDate: string;
    contaminationStatus: boolean | null;
  };
}

export class SubstrateAssignmentListResponseDto {
  @ApiProperty({ type: () => [SubstrateAssignmentResponseDto] })
  items: SubstrateAssignmentResponseDto[];
}
