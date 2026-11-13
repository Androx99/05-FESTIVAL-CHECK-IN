import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inscripcion } from '../inscripcion/inscripcion.entity';

@Entity('fci_eventos')
export class Evento {
  @PrimaryGeneratedColumn({ name: 'event_id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  // Un evento tiene muchas inscripciones (1:N)
  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.evento)
  inscripciones: Inscripcion[];
}
