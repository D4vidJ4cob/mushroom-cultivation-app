import { Module } from '@nestjs/common';
import { GrainSpawnController } from './grain-spawn.controller';
import { GrainSpawnService } from './grain-spawn.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [GrainSpawnController],
  providers: [GrainSpawnService],
  imports: [DrizzleModule],
})
export class GrainSpawnModule {}
