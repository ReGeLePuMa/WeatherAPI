import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class TemperatureDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    idOras: number;

    @IsNumber()
    valoare: number;

    @IsOptional()
    @IsDate()
    timestamp?: Date;
}
