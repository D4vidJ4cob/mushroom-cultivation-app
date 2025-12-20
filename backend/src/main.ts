import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, LogConfig, ServerConfig } from './config/configuration';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import CustomLogger from './core/customLogger';
import { HttpExceptionFilter } from './lib/http-exception.filter';
import { DrizzleQueryErrorFilter } from './drizzle/drizzle-query-error.filter';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOG_DISABLED === 'true' ? false : undefined,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DrizzleQueryErrorFilter());

  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  const log = config.get<LogConfig>('log')!;

  if (!log.disabled) {
    app.useLogger(
      new CustomLogger({
        logLevels: log.levels,
      }),
    );
  }

  app.use(helmet());
  app.enableCors({
    origin: [cors.origins],
    maxAge: cors.maxAge,
    credentials: true,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cultivation App')
    .setDescription('Cultivation API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port, () => {
    new Logger().log(`Server is listening at port ${port}`);
  });
}
bootstrap();
