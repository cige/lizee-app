// item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity({ name: 'rental' })
export class Rental {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => Item, (item: Item) => item.rentals)
    item: Item

    @Column({ type: 'timestamptz' })
    startingDate: Date

    @Column({ type: 'timestamptz' })
    endingDate: Date
}