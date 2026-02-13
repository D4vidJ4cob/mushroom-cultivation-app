import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  type DatabaseProvider,
  DrizzleAsyncProvider,
  drizzleProvider,
  InjectDrizzle,
} from './drizzle.provider';

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(DrizzleModule.name);

  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  // async onModuleInit() {
  //   this.logger.log('⏳ Running migrations...');

  //   await migrate(this.db, {
  //     migrationsFolder: path.resolve('migrations'),
  //   });
  //   this.logger.log('✅ Migrations completed!');
  // }

  onModuleInit() {
    this.logger.log('⏭️ Skipping automatic migrations');
  }

  async onModuleDestroy() {
    await this.db.$client.end();
  }
}
