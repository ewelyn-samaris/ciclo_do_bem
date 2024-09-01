import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Ciclo do Bem API Documentation')
    .setDescription(
      'A Ciclo do Bem API foi desenvolvida para conectar usuários doadores de recicláveis e catadores para fins de coleta porta-a-porta, contribuindo assim ao aumento da quantidade de recicláveis coletados, redução do impacto ambiental pelo descarte destes, além do crescimento e fortalecimento da renda dos catadores cadastrados',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
