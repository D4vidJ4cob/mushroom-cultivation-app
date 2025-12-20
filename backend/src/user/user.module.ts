import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UserService } from './user.service';
import { SubstrateModule } from '../substrate/substrate.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DrizzleModule, SubstrateModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
