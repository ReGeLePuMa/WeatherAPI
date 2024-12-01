import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
