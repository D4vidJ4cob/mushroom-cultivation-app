import {
  Get,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateMotherCultureRequestDto,
  MotherCultureDetailResponseDto,
  MotherCultureListResponseDto,
  UpdateMotherCultureRequestDto,
} from './mother-culture.dto';
import { MotherCultureService } from './mother-culture.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Mother Cultures')
@ApiBearerAuth()
@Controller('mother-cultures')
export class MotherCultureController {
  constructor(private readonly motherCultureService: MotherCultureService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all cultures',
    type: MotherCultureListResponseDto,
  })
  @Get()
  async getAllMotherCultures(): Promise<MotherCultureListResponseDto> {
    return await this.motherCultureService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get culture by ID',
    type: MotherCultureDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Culture not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Get(':id')
  async getMotherCultureById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MotherCultureDetailResponseDto> {
    return this.motherCultureService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create culture',
    type: MotherCultureDetailResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMotherCulture(
    @Body() createMotherCultureDto: CreateMotherCultureRequestDto,
  ): Promise<MotherCultureDetailResponseDto> {
    return this.motherCultureService.create(createMotherCultureDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update culture',
    type: MotherCultureDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Culture not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async updateMotherCultureById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMotherCultureDto: UpdateMotherCultureRequestDto,
  ): Promise<MotherCultureDetailResponseDto> {
    return this.motherCultureService.updateById(id, updateMotherCultureDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete culture',
  })
  @ApiResponse({
    status: 404,
    description: 'Culture not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMotherCultureById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.motherCultureService.deleteById(id);
  }
}
