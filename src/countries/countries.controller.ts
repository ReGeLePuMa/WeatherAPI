import { Param, Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDTO } from './entities/country.dto';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) { }

    @Post()
    async createCountry(@Body() country: CountryDTO): Promise<{ id: number }> {
        return this.countriesService.createCountry(country);
    }

    @Get()
    async getCountries(): Promise<CountryDTO[]> {
        return this.countriesService.getCountries();
    }

    @Put(':id')
    async updateCountry(
        @Param('id') id: number,
        @Body() country: CountryDTO): Promise<void> {
        return this.countriesService.updateCountry(country, id);
    }

    @Delete(':id')
    async deleteCountry(@Param('id') id: number): Promise<void> {
        return this.countriesService.deleteCountry(id);
    }
}
