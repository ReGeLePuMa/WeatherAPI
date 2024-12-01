import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, JoinColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Temperature } from '../../temperatures/entities/temperature.entity';

@Entity('cities')
@Unique(['id_tara', 'nume_oras'])
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_tara: number;

    @Column()
    nume_oras: string;

    @Column('double precision')
    latitudine: number;

    @Column('double precision')
    longitudine: number;

    @ManyToOne(() => Country, (country) => country.orase, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_tara' })
    tara: Country;

    @OneToMany(() => Temperature, (temperature) => temperature.oras, { cascade: true })
    temperaturi: Temperature[];
}
