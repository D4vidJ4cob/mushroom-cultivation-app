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
import {
  CreateLiquidCultureRequestDto,
  LiquidCultureDetailResponseDto,
  LiquidCultureListResponseDto,
  UpdateLiquidCultureRequestDto,
} from './liquid-culture.dto';
import { LiquidCultureService } from './liquid-culture.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Liquid Cultures')
@ApiBearerAuth()
@Controller('liquid-cultures')
export class LiquidCultureController {
  constructor(private readonly liquidCultureService: LiquidCultureService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all cultures',
    type: LiquidCultureListResponseDto,
  })
  @Get()
  async getAllLiquidCultures(): Promise<LiquidCultureListResponseDto> {
    return await this.liquidCultureService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get culture by ID',
    type: LiquidCultureDetailResponseDto,
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
  async getLiquidCultureById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LiquidCultureDetailResponseDto> {
    return await this.liquidCultureService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create culture',
    type: LiquidCultureDetailResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLiquidCulture(
    @Body() createLiquidCultureDto: CreateLiquidCultureRequestDto,
  ): Promise<LiquidCultureDetailResponseDto> {
    return this.liquidCultureService.create(createLiquidCultureDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update culture',
    type: LiquidCultureDetailResponseDto,
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
  async updateLiquidCultureById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLiquidCultureDto: UpdateLiquidCultureRequestDto,
  ): Promise<LiquidCultureDetailResponseDto> {
    return this.liquidCultureService.updateById(id, updateLiquidCultureDto);
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
  async deleteLiquidCulture(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.liquidCultureService.deleteById(id);
  }
}
