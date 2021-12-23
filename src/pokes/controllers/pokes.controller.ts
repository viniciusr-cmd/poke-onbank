import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Pokes } from '../models/poke.interface';
import { PokesService } from '../services/pokes.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('pokes')
@ApiTags('Onbank Pokes')
export class PokesController {
  constructor(private pokesService: PokesService) {}

  @Post()
  @ApiCreatedResponse({description: 'Custom Poke criado com sucesso'})
  create(@Body() pokes: Pokes) {
    return this.pokesService.createPoke(pokes);
  }

  @Get()
  @ApiOkResponse({description: 'Custom Poke listado com sucesso'})
  findAll(): Observable<Pokes[]> {
    return this.pokesService.findAll();
  }

  @Get('pokeapi/:id')
  @ApiOkResponse({description: 'ID encontrada com sucesso na PokeAPI'})
  getAllApi(@Param('id') id: number): Observable<AxiosResponse<Pokes[]>> {
    return this.pokesService.getPokes(id);
  }

  @Get('pokeapi/list/:offset')
  @ApiOkResponse({description: 'Listado com sucesso na PokeAPI'})
  getListApi(
    @Param('offset') offset: number,
  ): Observable<AxiosResponse<Pokes[]>> {
    return this.pokesService.getList(offset);
  }

  @Get(':id')
  @ApiOkResponse({description: 'Custom poke encontrado com sucesso'})
  findOne(@Param('id') id: number): Observable<Pokes> {
    return this.pokesService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({description: 'Custom poke atualizado com sucesso'})
  update(
    @Param('id') id: number,
    @Body() pokes: Pokes,
  ): Observable<UpdateResult> {
    return this.pokesService.updatePokes(id, pokes);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Custom poke deletado com sucesso'})
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.pokesService.deletePokes(id);
  }
}
