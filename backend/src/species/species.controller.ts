import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateSpeciesRequestDto,
  SpeciesListResponseDto,
  SpeciesResponseDto,
  UpdateSpeciesRequestDto,
} from './species.dto';
import { SpeciesService } from './species.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Species')
@ApiBearerAuth()
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all species',
    type: SpeciesListResponseDto,
  })
  @Get()
  async getAllSpecies(): Promise<SpeciesListResponseDto> {
    return await this.speciesService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get species by ID',
    type: SpeciesResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Get(':id')
  async getSpeciesById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SpeciesResponseDto> {
    return this.speciesService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create species',
    type: SpeciesResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSpecies(
    @Body() createSpeciesDto: CreateSpeciesRequestDto,
  ): Promise<SpeciesResponseDto> {
    return this.speciesService.create(createSpeciesDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update species',
    type: SpeciesResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async updateSpeciesById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpeciesDto: UpdateSpeciesRequestDto,
  ): Promise<SpeciesResponseDto> {
    return this.speciesService.updateById(id, updateSpeciesDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete species',
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSpeciesById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.speciesService.deleteById(id);
  }
}
