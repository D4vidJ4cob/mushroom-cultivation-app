import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { SpeciesModule } from './species/species.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MotherCultureModule } from './mother-culture/mother-culture.module';
import { LiquidCultureModule } from './liquid-culture/liquid-culture.module';
import { GrainSpawnModule } from './grain-spawn/grain-spawn.module';
import { BatchAssignmentModule } from './batch-assignment/batch-assignment.module';
import { SubstrateModule } from './substrate/substrate.module';
import configuration from './config/configuration';
import { LoggerMiddleware } from './lib/logger-middleware';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    SpeciesModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DrizzleModule,
    MotherCultureModule,
    LiquidCultureModule,
    GrainSpawnModule,
    BatchAssignmentModule,
    SubstrateModule,
    UserModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
