import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('temperatures')
@Unique(['id_oras', 'timestamp'])
export class Temperature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valoare: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @Column()
    id_oras: number;

    @ManyToOne(() => City, (city) => city.temperaturi, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_oras' })
    oras: City;
}
