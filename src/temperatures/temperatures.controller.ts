import { Controller } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';

@Controller('temperatures')
export class TemperaturesController {
    constructor(private readonly temperaturesService: TemperaturesService) { }
}
