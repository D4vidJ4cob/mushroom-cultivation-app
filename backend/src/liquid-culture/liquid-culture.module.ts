import { Module } from '@nestjs/common';
import { LiquidCultureService } from './liquid-culture.service';
import { LiquidCultureController } from './liquid-culture.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [LiquidCultureController],
  providers: [LiquidCultureService],
  imports: [DrizzleModule],
})
export class LiquidCultureModule {}
