import { Module } from '@nestjs/common';
import { SubstrateController } from './substrate.controller';
import { SubstrateService } from './substrate.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [SubstrateController],
  providers: [SubstrateService],
  imports: [DrizzleModule],
  exports: [SubstrateService],
})
export class SubstrateModule {}
