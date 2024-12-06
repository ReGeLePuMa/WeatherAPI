import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CityDTO } from './entities/city.dto';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Post()
    async createCity(@Body() city: CityDTO): Promise<{ id: number }> {
        return this.citiesService.createCity(city);
    }

    @Get()
    async getCities(): Promise<CityDTO[]> {
        return this.citiesService.getCities();
    }

    @Get('/country/:id?')
    async getCitiesByCountry(@Param('id') id: number| null): Promise<CityDTO[]> {
        return this.citiesService.getCitiesByCountry(id);
    }

    @Put(':id')
    async updateCity(
        @Param('id') id: number,
        @Body() city: CityDTO): Promise<void> {
        return this.citiesService.updateCity(city, id);
    }

    @Delete(':id')
    async deleteCity(@Param('id') id: number): Promise<void> {
        return this.citiesService.deleteCity(id);
    }

}
