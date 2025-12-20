import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService],
  imports: [DrizzleModule],
})
export class SpeciesModule {}
