import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Country } from './entities/country.entity';
import { CountryDTO } from './entities/country.dto';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>
    ) { }

    async createCountry(country: CountryDTO): Promise<{ id: number }> {
        try {
            await validateOrReject(country);
        }
        catch (errors) {
            throw new BadRequestException("Invalid country data");
        }

        const { nume, lat, lon } = country;

        const existingCountry = await this.countryRepository.findOne({ where: { nume_tara: nume } });
        if (existingCountry) {
            throw new ConflictException('Country already exists');
        }
        const newCountry = await this.countryRepository.save({ nume_tara: nume, latitudine: lat, longitudine: lon });
        return { id: newCountry.id };
    }

    async getCountries(): Promise<CountryDTO[]> {
        return (await this.countryRepository.find()).map(country => ({
            id: country.id,
            nume: country.nume_tara,
            lat: country.latitudine,
            lon: country.longitudine
        }));
    }

    async updateCountry(country: CountryDTO, id: number): Promise<void> {
        try {
            await validateOrReject(country);
        }
        catch (errors) {
            throw new BadRequestException("Invalid country data");
        }
        if (!id || typeof id !== 'number' || isNaN(id) || id <= 0) {
            throw new BadRequestException('Invalid country id');
        }
        const { nume, lat, lon } = country;
        const existingCountry = await this.countryRepository.findOne({ where: { id } });
        if (!existingCountry) {
            throw new NotFoundException('Country not found');
        }
        await this.countryRepository.update(id, { nume_tara: nume, latitudine: lat, longitudine: lon });
    }

    async deleteCountry(id: number): Promise<void> {
        const existingCountry = await this.countryRepository.findOne({ where: { id } });
        if (!existingCountry) {
            throw new NotFoundException('Country not found');
        }
        await this.countryRepository.delete(id);
    }
}
