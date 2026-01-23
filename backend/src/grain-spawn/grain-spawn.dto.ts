import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';
import { IsString, IsBoolean, IsNumber } from 'nestjs-swagger-dto';
import { SpeciesResponseDto } from '../species/species.dto';

export class CreateGrainSpawnRequestDto {
  @IsDateString()
  inoculationDate: string;

  @IsNumber({ name: 'speciesId', min: 1 })
  speciesId: number;

  @IsString({ name: 'characteristic', maxLength: 255 })
  @IsOptional()
  characteristic?: string;

  @IsBoolean({ name: 'contaminationStatus' })
  @IsOptional()
  contaminationStatus?: boolean;

  @IsBoolean({ name: 'shaken' })
  @IsOptional()
  shaken?: boolean;

  @IsNumber({ name: 'motherCultureId', min: 1 })
  @IsOptional()
  motherCultureId?: number;

  @IsNumber({ name: 'liquidCultureId', min: 1 })
  @IsOptional()
  liquidCultureId?: number;
}

export class UpdateGrainSpawnRequestDto extends PartialType(
  CreateGrainSpawnRequestDto,
) {}

export class GrainSpawnResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the grain spawn',
  })
  id: number;

  @ApiProperty({
    example: '2025-01-25T00:00:00.000Z',
    description: 'Date when grain spawn was inoculated',
    type: 'string',
    format: 'date',
  })
  inoculationDate: string;

  @ApiProperty({
    example: false,
    description: 'Contamination status of the grain spawn',
    nullable: true,
    type: 'boolean',
  })
  contaminationStatus: boolean | null;

  @ApiProperty({
    example: true,
    description: 'Whether the grain spawn has been shaken',
    nullable: true,
    type: 'boolean',
  })
  shaken: boolean | null;

  @ApiProperty({
    example: 1,
    description: 'ID of the mother culture used',
    nullable: true,
  })
  motherCultureId: number | null;

  @ApiProperty({
    example: null,
    description: 'ID of the liquid culture used',
    nullable: true,
  })
  liquidCultureId: number | null;

  @ApiProperty({ type: () => SpeciesResponseDto })
  species: SpeciesResponseDto;
}

export class GrainSpawnDetailResponseDto extends GrainSpawnResponseDto {
  @ApiProperty({
    example: 'This grain has been soaked',
    description: 'Extra characteristics of the grain spawn',
    nullable: true,
  })
  characteristic: string | null;
}

export class GrainSpawnsListResponseDto {
  @ApiProperty({ type: () => [GrainSpawnResponseDto] })
  items: GrainSpawnResponseDto[];
}
