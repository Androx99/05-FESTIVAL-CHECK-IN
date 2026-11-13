import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  exports: [TypeOrmModule],
})
export class EventoModule {}
