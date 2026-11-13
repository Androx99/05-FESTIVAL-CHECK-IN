import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Evento } from '../evento/evento.entity';

@Entity('fci_inscripciones')
@Unique(['evento', 'userId']) // Un usuario solo puede tener una inscripción por evento
export class Inscripcion {
  @PrimaryGeneratedColumn({ name: 'registration_id' })
  registrationId: number;

  // Referencia al usuario (ej: 'usuario-02')
  @Column({ name: 'user_id', type: 'varchar', length: 100 })
  userId: string;

  // Fecha de inscripción automática al guardar
  @CreateDateColumn({ name: 'registered_at', type: 'timestamp' })
  registeredAt: Date;

  // Fecha de entrada / check-in (opcional)
  @Column({ name: 'checked_in_at', type: 'timestamp', nullable: true })
  checkedInAt: Date | null;

  // Muchas inscripciones pertenecen a un solo evento (N:1)
  @ManyToOne(() => Evento, (evento) => evento.inscripciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  evento: Evento;
}
