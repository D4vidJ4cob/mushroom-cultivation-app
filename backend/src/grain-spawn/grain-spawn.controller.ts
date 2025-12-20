import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GrainSpawnService } from './grain-spawn.service';
import {
  CreateGrainSpawnRequestDto,
  GrainSpawnDetailResponseDto,
  GrainSpawnsListResponseDto,
  UpdateGrainSpawnRequestDto,
} from './grain-spawn.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Grain Spawns')
@ApiBearerAuth()
@Controller('grain-spawns')
export class GrainSpawnController {
  constructor(private readonly grainSpawnService: GrainSpawnService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all grain spawns',
    type: GrainSpawnsListResponseDto,
  })
  @Get()
  async getAllGrainSpawns(): Promise<GrainSpawnsListResponseDto> {
    return await this.grainSpawnService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get grain spawn by ID',
    type: GrainSpawnDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Grain sapwn not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Get(':id')
  async getGrainSpawnById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GrainSpawnDetailResponseDto> {
    return await this.grainSpawnService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create grain spawn',
    type: GrainSpawnDetailResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createGrainSpawn(
    @Body() createGrainSpawnDto: CreateGrainSpawnRequestDto,
  ): Promise<GrainSpawnDetailResponseDto> {
    return this.grainSpawnService.create(createGrainSpawnDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update grain spawn',
    type: GrainSpawnDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Grain spawn not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async updateGrainSpawnById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrainSpawnDto: UpdateGrainSpawnRequestDto,
  ): Promise<GrainSpawnDetailResponseDto> {
    return this.grainSpawnService.updateById(id, updateGrainSpawnDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete grain spawn',
  })
  @ApiResponse({
    status: 404,
    description: 'Grain spawn not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGrainSpawn(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.grainSpawnService.deleteById(id);
  }
}
