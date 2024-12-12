import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CityDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    idTara: number;

    @IsString()
    nume: string;

    @IsNumber()
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    lon: number;
}