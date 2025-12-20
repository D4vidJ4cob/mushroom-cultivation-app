import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsDateString } from 'class-validator';
import { IsString, IsBoolean, IsNumber } from 'nestjs-swagger-dto';
import { SpeciesResponseDto } from '../species/species.dto';

export class CreateLiquidCultureRequestDto {
  @IsString({ name: 'name', maxLength: 255 })
  name: string;

  @IsDateString()
  inoculationDate: string;

  @IsString({ name: 'characteristic', maxLength: 255 })
  @IsOptional()
  characteristic?: string;

  @IsBoolean({ name: 'contamination status' })
  @IsOptional()
  contaminationStatus?: boolean;

  @IsNumber({ name: 'speciesId', min: 1 })
  speciesId: number;
}

export class UpdateLiquidCultureRequestDto extends PartialType(
  CreateLiquidCultureRequestDto,
) {}

export class LiquidCultureResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the culture' })
  id: number;

  @ApiProperty({
    example: 'Mushroom mania',
    description: 'Name of the culture',
  })
  name: string;

  @ApiProperty({
    example: '2025-01-20T00:00:00.000Z',
    description: 'Date when culture was inoculated',
    type: 'string',
    format: 'date-time',
  })
  inoculationDate: Date;

  @ApiProperty({
    example: true,
    description: 'Contamination status of the culture',
    nullable: true,
    type: 'boolean',
  })
  contaminationStatus: boolean | null;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the species',
  })
  speciesId: number;
}

export class LiquidCultureDetailResponseDto extends LiquidCultureResponseDto {
  @ApiProperty({
    example: 'USA',
    description: 'Extra information about the culture',
    nullable: true,
  })
  characteristic: string | null;

  @ApiProperty({ type: () => [SpeciesResponseDto] })
  species: SpeciesResponseDto;
}

export class LiquidCultureListResponseDto {
  @ApiProperty({ type: () => [LiquidCultureResponseDto] })
  items: LiquidCultureResponseDto[];
}
