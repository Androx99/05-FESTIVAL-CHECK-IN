# CREACION FESTIVAL CHECK IN CON NESTJS
## CREACION BASE DATOS EN PSQL
psql -U postgres
CREATE DATABASE pruebaFestivalCheckIn
\l 
\q

## CREACION BACKEND

INSCRIPCIONES 1-N EVENTOS

### Instalación Backend
Instalación backend:
nest new backend
cd backend
npm install @nestjs/typeorm typeorm pg

### Creación controller/module/service

nest g controller inscripcion
nest g module inscripcion
nest g service inscripcion

### Modificaciones al código
#### En main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
  console.log('API disponible en http://localhost:3000');
}
bootstrap();
#### En app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'databridge_e08',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlaylistsModule,
  ],
})
export class AppModule {}