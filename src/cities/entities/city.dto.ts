import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CityDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    idTara: number;

    @IsString()
    nume: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;
}