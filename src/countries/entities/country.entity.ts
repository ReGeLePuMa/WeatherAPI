import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nume_tara: string;

    @Column('double precision')
    latitudine: number;

    @Column('double precision')
    longitudine: number;

    @OneToMany(() => City, (city) => city.tara, { cascade: true })
    orase: City[];
}
