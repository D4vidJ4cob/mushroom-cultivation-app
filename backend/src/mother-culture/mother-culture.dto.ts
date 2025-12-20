import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { IsString, IsNumber } from 'nestjs-swagger-dto';
import { LiquidCultureResponseDto } from '../liquid-culture/liquid-culture.dto';

import { SpeciesResponseDto } from '../species/species.dto';

export class CreateMotherCultureRequestDto {
  @IsString({ name: 'name', maxLength: 255 })
  name: string;

  @IsDateString()
  inoculationDate: string;

  @IsString({ name: 'characteristic', maxLength: 255 })
  @IsOptional()
  characteristic?: string;

  @IsNumber({ name: 'speciesId', min: 1 })
  speciesId: number;
}

export class UpdateMotherCultureRequestDto extends PartialType(
  CreateMotherCultureRequestDto,
) {}

export class MotherCultureResponseDto {
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
    type: String,
    format: 'date-time',
  })
  inoculationDate: Date;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the species',
  })
  speciesId: number;
}

export class MotherCultureDetailResponseDto extends MotherCultureResponseDto {
  @ApiProperty({
    example: 'Grow room clone',
    description: 'Extra information about the culture',
    nullable: true,
  })
  characteristic: string | null;

  @ApiProperty({ type: () => [SpeciesResponseDto] })
  species: SpeciesResponseDto;
}

export class MotherCultureListResponseDto {
  @ApiProperty({ type: () => [LiquidCultureResponseDto] })
  items: MotherCultureResponseDto[];
}
