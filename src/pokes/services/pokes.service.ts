import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm'
import { from, Observable, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { PokesEntity } from '../models/poke.entity';
import { Pokes } from '../models/poke.interface';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'

@Injectable()
export class PokesService {
    constructor(
        @InjectRepository(PokesEntity)
        private readonly pokesEntityRepository: Repository<PokesEntity>, private readonly httpService: HttpService
    ) {}

    getPokes(params): Observable<AxiosResponse<Pokes[]>> {
        const url = `https://pokeapi.co/api/v2/pokemon/${params}`
        return this.httpService.get(url)
        .pipe(map(response => response.data))
    }

    getList(offset): Observable<AxiosResponse<Pokes[]>> {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
        return this.httpService.get(url)
        .pipe(map(response => response.data))
    }

    createPoke(pokes: Pokes): Observable<Pokes> {
        return from(this.pokesEntityRepository.save(pokes))
    }

    findAll(): Observable<Pokes[]> {
        return from(this.pokesEntityRepository.find())
    }

    findOne(id: number): Observable<Pokes> {
        return from(this.pokesEntityRepository.findOne(id))
    }

    updatePokes(id: number, pokes: Pokes): Observable<UpdateResult> {
        return from(this.pokesEntityRepository.update(id, pokes))
    }

    deletePokes(id: number): Observable<DeleteResult> {
        return from(this.pokesEntityRepository.delete(id))
    }
}