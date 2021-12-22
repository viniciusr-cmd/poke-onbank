import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm'
import { Pokes } from '../models/poke.interface';
import { PokesService } from '../services/pokes.service'
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'

@Controller('pokes')
export class PokesController {
    constructor(private pokesService: PokesService) { }

    @Post()
    create(@Body() pokes: Pokes) {
        return this.pokesService.createPoke(pokes)
    }

    @Get()
    findAll(): Observable<Pokes[]> {
        return this.pokesService.findAll()
    }

    @Get('pokeapi/:id')
    getAllApi(@Param('id') id: number): Observable<AxiosResponse<Pokes[]>> {
        return this.pokesService.getPokes(id)
    }

    @Get('pokeapi/list/:offset')
    getListApi(@Param('offset') offset: number): Observable<AxiosResponse<Pokes[]>> {
        return this.pokesService.getList(offset)
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Pokes> {
        return this.pokesService.findOne(id)
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() pokes: Pokes
    ): Observable<UpdateResult> {
        return this.pokesService.updatePokes(id, pokes)
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.pokesService.deletePokes(id);
    }
}