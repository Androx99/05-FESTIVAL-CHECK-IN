import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'pruebaFestivalCheckIn',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventoModule,
    InscripcionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
