import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CityDTO } from './entities/city.dto';
@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) { }

    async createCity(city: CityDTO): Promise<{ id: number }> {
        const { nume, lat, lon, idTara } = city;

        try {
            await validateOrReject(city);
        }
        catch (errors) {
            throw new BadRequestException("Invalid city data");
        }

        const existingCountry = await this.cityRepository
            .createQueryBuilder('city')
            .innerJoin('city.tara', 'country')
            .where('country.id = :idTara', { idTara })
            .select('country.id')
            .getOne();

        if (!existingCountry) {
            throw new NotFoundException('Country does not exist');
        }
        const existingCity = await this.cityRepository.findOne({ where: { nume_oras: nume, id_tara: idTara } });
        if (existingCity) {
            throw new ConflictException('City already exists');
        }
        const newCity = await this.cityRepository.save({ nume_oras: nume, latitudine: lat, longitudine: lon, id_tara: idTara });
        return { id: newCity.id };
    }

    async getCities(): Promise<CityDTO[]> {
        return (await this.cityRepository.find()).map(city => ({
            id: city.id,
            idTara: city.id_tara,
            nume: city.nume_oras,
            lat: city.latitudine,
            lon: city.longitudine
        }));
    }

    async getCitiesByCountry(id: number | null): Promise<CityDTO[]> {
        return (await this.cityRepository.find({ where: { id_tara: id } })).map(city => ({
            id: city.id,
            idTara: city.id_tara,
            nume: city.nume_oras,
            lat: city.latitudine,
            lon: city.longitudine
        }));
    }

    async updateCity(city: CityDTO, id: number): Promise<void> {
        try {
            await validateOrReject(city);
        }
        catch (errors) {
            throw new BadRequestException("Invalid city data");
        }
        if (!id || typeof id !== 'number' || isNaN(id) || id <= 0 || id !== city.id) {
            throw new BadRequestException('Invalid city id');
        }
        const { nume, lat, lon, idTara } = city;
        const existingCity = await this.cityRepository.findOne({ where: { id } });
        if (!existingCity) {
            throw new NotFoundException('City not found');
        }
        const existingCountry = await this.cityRepository
            .createQueryBuilder('city')
            .innerJoin('city.tara', 'country')
            .where('country.id = :idTara', { idTara })
            .select('country.id')
            .getOne();

        if (!existingCountry) {
            throw new ConflictException('Country does not exist');
        }

        await this.cityRepository.update(id, { nume_oras: nume, latitudine: lat, longitudine: lon, id_tara: idTara });
    }

    async deleteCity(id: number): Promise<void> {
        const existingCity = await this.cityRepository.findOne({ where: { id } });
        if (!existingCity) {
            throw new NotFoundException('City not found');
        }
        await this.cityRepository.delete(id);
    }
}
