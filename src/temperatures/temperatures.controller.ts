import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { TemperatureDTO } from './entities/temperature.dto';

@Controller('temperatures')
export class TemperaturesController {
    constructor(private readonly temperaturesService: TemperaturesService) { }

    @Post()
    async createTemperature(@Body() temperature: TemperatureDTO): Promise<{ id: number }> {
        return this.temperaturesService.createTemperature(temperature);
    }

    @Get()
    async get(
        @Query('lat') lat: string | null,
        @Query('lon') lon: string | null,
        @Query('from') from: string | null,
        @Query('until') until: string | null,
    ): Promise<TemperatureDTO[]> {
        return this.temperaturesService.getTemperatures(lat, lon, from, until);
    }

    @Get('/cities/:id_oras?')
    async getCityTemperatures(
        @Param('id_oras') id_oras: number | null,
        @Query('from') from: string | null,
        @Query('until') until: string | null,
    ): Promise<TemperatureDTO[]> {
        return this.temperaturesService.getCityTemperatures(id_oras, from, until);
    }

    @Get('/countries/:id_tara?')
    async getCountryTemperatures(
        @Param('id_tara') id_tara: number | null,
        @Query('from') from: string,
        @Query('until') until: string,
    ): Promise<TemperatureDTO[]> {
        return this.temperaturesService.getCountryTemperatures(id_tara, from, until);
    }

    @Put(':id')
    async updateTemperature(
        @Param('id') id: number,
        @Body() temperature: TemperatureDTO
    ): Promise<void> {
        return this.temperaturesService.updateTemperature(temperature, id);
    }

    @Delete(':id')
    async deleteTemperature(@Param('id') id: number): Promise<void> {
        return this.temperaturesService.deleteTemperature(id);
    }   

}
