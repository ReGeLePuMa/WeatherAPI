import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { TemperaturesModule } from './temperatures/temperatures.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      logging: true,
    }),
    CountriesModule,
    CitiesModule,
    TemperaturesModule],
})
export class AppModule { }
