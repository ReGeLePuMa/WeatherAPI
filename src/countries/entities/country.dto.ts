import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CountryDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsString()
    nume: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;
}
