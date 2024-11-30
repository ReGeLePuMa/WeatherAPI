import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { TemperaturesModule } from './temperatures/temperatures.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
      logging: true,
    }),
    CountriesModule,
    CitiesModule,
    TemperaturesModule
  ],
})
export class AppModule { }
