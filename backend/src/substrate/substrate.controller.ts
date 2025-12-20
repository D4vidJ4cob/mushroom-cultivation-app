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
import { SubstrateService } from './substrate.service';
import {
  CreateSubstrateRequestDto,
  SubstrateDetailResponseDto,
  SubstrateListResponseDto,
  SubstrateResponseDto,
  UpdateSubstrateRequestDto,
} from './substrate.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Substrates')
@ApiBearerAuth()
@Controller('substrates')
export class SubstrateController {
  constructor(private readonly substrateService: SubstrateService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all substrates',
    type: SubstrateListResponseDto,
  })
  @Get()
  async getAllSubstrates(): Promise<SubstrateListResponseDto> {
    return await this.substrateService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get substrates by ID',
    type: SubstrateDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Substrates not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Get(':id')
  async getSubstrateById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubstrateDetailResponseDto> {
    return this.substrateService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create substrates',
    type: SubstrateDetailResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSubstrate(
    @Body() createSubstrateDto: CreateSubstrateRequestDto,
  ): Promise<SubstrateResponseDto> {
    return this.substrateService.create(createSubstrateDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update substrates',
    type: SubstrateDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Substrates not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async updateSubstrateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubstrateDto: UpdateSubstrateRequestDto,
  ): Promise<SubstrateResponseDto> {
    return this.substrateService.updateById(id, updateSubstrateDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete substrates',
  })
  @ApiResponse({
    status: 404,
    description: 'Substrates not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubstrateById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.substrateService.deleteById(id);
  }
}
