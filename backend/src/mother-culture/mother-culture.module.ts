import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { MotherCultureService } from './mother-culture.service';
import { MotherCultureController } from './mother-culture.controller';

@Module({
  controllers: [MotherCultureController],
  providers: [MotherCultureService],
  imports: [DrizzleModule],
})
export class MotherCultureModule {}
