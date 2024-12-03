import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temperature } from './entities/temperature.entity';

@Injectable()
export class TemperaturesService {
    constructor(
        @InjectRepository(Temperature)
        private temperatureRepository: Repository<Temperature>
    ) { }
}
