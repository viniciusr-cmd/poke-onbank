import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokesEntity } from './models/poke.entity';
import { PokesService } from './services/pokes.service';
import { PokesController } from './controllers/pokes.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PokesEntity]), HttpModule],
  providers: [PokesService],
  controllers: [PokesController],
})
export class PokesModule {}
