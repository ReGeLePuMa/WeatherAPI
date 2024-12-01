import { Module } from '@nestjs/common';
import { TemperaturesController } from './temperatures.controller';
import { TemperaturesService } from './temperatures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperature } from './entities/temperature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  controllers: [TemperaturesController],
  providers: [TemperaturesService],
  exports: [TypeOrmModule],
})
export class TemperaturesModule {}
