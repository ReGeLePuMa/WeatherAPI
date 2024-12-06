import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temperature } from './entities/temperature.entity';
import { TemperatureDTO } from './entities/temperature.dto';
@Injectable()
export class TemperaturesService {
    constructor(
        @InjectRepository(Temperature)
        private temperatureRepository: Repository<Temperature>
    ) { }

    async createTemperature(temperature: TemperatureDTO): Promise<{ id: number }> {
        const { idOras, valoare } = temperature;
        if (typeof idOras !== 'number' || typeof valoare !== 'number') {
            throw new BadRequestException('Invalid temperature data');
        }

        const existingCity = await this.temperatureRepository
            .createQueryBuilder('temperature')
            .leftJoin('temperature.oras', 'city')
            .where('city.id = :idOras', { idOras })
            .select('city.id')
            .getOne();

        if (!existingCity) {
            throw new NotFoundException('City does not exist');
        }

        const newTemperature = await this.temperatureRepository.save({ valoare, id_oras: idOras });

        return { id: newTemperature.id };
    }

    async getTemperatures(lat: string | null, lon: string | null, from: string | null, until: string | null): Promise<TemperatureDTO[]> {
        const latitude = lat ? parseFloat(lat) : null;
        const longitude = lon ? parseFloat(lon) : null;
        const fromDate = from ? new Date(from) : new Date(0);
        const untilDate = until ? new Date(until) : new Date();
        let query = this.temperatureRepository
            .createQueryBuilder('temperature')
            .leftJoin('temperature.oras', 'city')
            .where('temperature.timestamp between :start AND :end', { start: fromDate, end: untilDate });
        if (latitude) {
            query = query.andWhere('city.latitudine = :lat', { lat: latitude });
        }
        if (longitude) {
            query = query.andWhere('city.longitudine = :lon', { lon: longitude });
        }
        return (await query.getMany()).map(temperature => ({
            id: temperature.id,
            idOras: temperature.id_oras,
            valoare: temperature.valoare,
            timestamp: temperature.timestamp
        }));
    }

    async getCityTemperatures(id_oras: number | null, from: string | null, until: string | null): Promise<TemperatureDTO[]> {
        const fromDate = from ? new Date(from) : new Date(0);
        const untilDate = until ? new Date(until) : new Date();
        const temperatures = await this.temperatureRepository
            .createQueryBuilder('temperature')
            .where('temperature.id_oras = :id_oras', { id_oras })
            .andWhere('temperature.timestamp between :start AND :end', { start: fromDate, end: untilDate })
            .getMany();
        return temperatures.map(temperature => ({
            id: temperature.id,
            idOras: temperature.id_oras,
            valoare: temperature.valoare,
            timestamp: temperature.timestamp
        }));
    }

    async getCountryTemperatures(id_tara: number | null, from: string, until: string): Promise<TemperatureDTO[]> {
        const fromDate = from ? new Date(from) : new Date(0);
        const untilDate = until ? new Date(until) : new Date();
        const temperatures = await this.temperatureRepository
            .createQueryBuilder('temperature')
            .leftJoin('temperature.oras', 'city')
            .where('city.id_tara = :id_tara', { id_tara })
            .andWhere('temperature.timestamp between :start AND :end', { start: fromDate, end: untilDate })
            .getMany();
        return temperatures.map(temperature => ({
            id: temperature.id,
            idOras: temperature.id_oras,
            valoare: temperature.valoare,
            timestamp: temperature.timestamp
        }));
    }

    async updateTemperature(temperature: TemperatureDTO, id: number): Promise<void> {
        const { idOras, valoare } = temperature;
        if (typeof idOras !== 'number' || typeof valoare !== 'number') {
            throw new BadRequestException('Invalid temperature data');
        }

        const existingTemperature = await this.temperatureRepository.findOne({ where: { id } });

        if (!existingTemperature) {
            throw new NotFoundException('Temperature does not exist');
        }

        const existingCity = await this.temperatureRepository
            .createQueryBuilder('temperature')
            .leftJoin('temperature.oras', 'city')
            .where('city.id = :idOras', { idOras })
            .select('city.id')
            .getOne();

        if (!existingCity) {
            throw new ConflictException('City does not exist');
        }

        await this.temperatureRepository.update(id, { valoare, id_oras: idOras });
    }

    async deleteTemperature(id: number): Promise<void> {
        const existingTemperature = await this.temperatureRepository.findOne({ where: { id } });

        if (!existingTemperature) {
            throw new NotFoundException('Temperature does not exist');
        }

        await this.temperatureRepository.delete(id);
    }

}
