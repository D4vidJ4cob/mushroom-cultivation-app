import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'nestjs-swagger-dto';

export class CreateSpeciesRequestDto {
  @IsString({ name: 'name', maxLength: 255 })
  name: string;
}

export class UpdateSpeciesRequestDto extends CreateSpeciesRequestDto {}

export class SpeciesResponseDto extends CreateSpeciesRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the species',
    type: 'number',
  })
  id: number;
}

export class SpeciesListResponseDto {
  items: SpeciesResponseDto[];
}
