import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './inscripcion.entity';
import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
  exports: [TypeOrmModule, InscripcionService],
})
export class InscripcionModule {}
