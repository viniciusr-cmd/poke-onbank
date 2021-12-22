import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pokes')
export class PokesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    height: string

    @Column()
    weight: string
}