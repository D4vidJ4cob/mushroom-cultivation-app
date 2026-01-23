import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSpeciesRequestDto,
  SpeciesListResponseDto,
  SpeciesResponseDto,
  UpdateSpeciesRequestDto,
} from './species.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { species } from '../drizzle/schema';

@Injectable()
export class SpeciesService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAll(): Promise<SpeciesListResponseDto> {
    const items = await this.db.query.species.findMany();
    return { items };
  }

  async getById(id: number): Promise<SpeciesResponseDto> {
    const specie = await this.db.query.species.findFirst({
      where: eq(species.id, id),
    });
    if (!specie) {
      throw new NotFoundException(`Species with ID ${id} not found.`);
    }
    return specie;
  }

  async create(
    createSpecies: CreateSpeciesRequestDto,
  ): Promise<SpeciesResponseDto> {
    const [newSpecies] = await this.db
      .insert(species)
      .values(createSpecies)
      .returning({ id: species.id });
    return this.getById(newSpecies.id);
  }

  async updateById(
    id: number,
    updateSpecies: UpdateSpeciesRequestDto,
  ): Promise<SpeciesResponseDto> {
    await this.db.update(species).set(updateSpecies).where(eq(species.id, id));
    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(species)
      .where(eq(species.id, id))
      .returning();
    if (result.length === 0) {
      throw new NotFoundException(`Species with ID ${id} not found.`);
    }
  }
}
