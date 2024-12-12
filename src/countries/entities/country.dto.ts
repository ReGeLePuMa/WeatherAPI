import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CountryDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

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
