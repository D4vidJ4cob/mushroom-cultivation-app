import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  InjectDrizzle,
  type DatabaseProvider,
} from '../drizzle/drizzle.provider';
import { liquidCultures } from '../drizzle/schema';
import {
  LiquidCultureListResponseDto,
  LiquidCultureDetailResponseDto,
  CreateLiquidCultureRequestDto,
  UpdateLiquidCultureRequestDto,
} from './liquid-culture.dto';

@Injectable()
export class LiquidCultureService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  private validateAndParseDate(
    dateInput: string | Date,
    fieldName = 'date',
  ): string {
    // parse if it's a string
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        `Invalid ${fieldName}: must be a valid date format (YYYY-MM-DD or ISO string)`,
      );
    }

    // Return in YYYY-MM-DD formaat for database compatibility
    return date.toISOString().split('T')[0];
  }

  async getAll(): Promise<LiquidCultureListResponseDto> {
    const items = await this.db.query.liquidCultures.findMany({
      with: {
        species: true,
      },
      orderBy: (liquidCultures, { desc }) => [
        desc(liquidCultures.inoculationDate),
      ],
    });

    return { items };
  }

  async getById(id: number): Promise<LiquidCultureDetailResponseDto> {
    const liquidCulture = await this.db.query.liquidCultures.findFirst({
      where: eq(liquidCultures.id, id),
      with: {
        species: true,
        grainSpawns: {
          orderBy: (grainSpawns, { desc }) => [
            desc(grainSpawns.inoculationDate),
          ],
        },
      },
    });

    if (!liquidCulture) {
      throw new NotFoundException(`Liquid Culture with ID ${id} not found`);
    }

    return liquidCulture;
  }

  async create(
    createDto: CreateLiquidCultureRequestDto,
  ): Promise<LiquidCultureDetailResponseDto> {
    const inoculationDate = this.validateAndParseDate(
      createDto.inoculationDate,
      'inoculation date',
    );

    const [newLiquidCulture] = await this.db
      .insert(liquidCultures)
      .values({
        ...createDto,
        inoculationDate,
      })
      .returning({ id: liquidCultures.id });

    return this.getById(newLiquidCulture.id);
  }

  async updateById(
    id: number,
    updateDto: UpdateLiquidCultureRequestDto,
  ): Promise<LiquidCultureDetailResponseDto> {
    const { inoculationDate, ...restData } = updateDto;

    const updateFields: Record<string, any> = {
      ...restData,
    };

    if (inoculationDate !== undefined) {
      updateFields.inoculationDate = this.validateAndParseDate(
        inoculationDate,
        'inoculation date',
      );
    }

    const result = await this.db
      .update(liquidCultures)
      .set(updateFields)
      .where(eq(liquidCultures.id, id))
      .returning(); // returns array of deleted rows

    if (result.length === 0) {
      throw new NotFoundException(`Liquid Culture with ID ${id} not found.`);
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(liquidCultures)
      .where(eq(liquidCultures.id, id))
      .returning(); // returns array of deleted rows

    if (result.length === 0) {
      throw new NotFoundException(`Liquid Culture with ID ${id} not found.`);
    }
  }
}
