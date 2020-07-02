import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Rental } from "./rental.entity";

@Entity({ name: 'item' })
export class Item {

    @PrimaryColumn({ type: 'varchar' })
    id: string;

    @Column({ type: 'varchar', length: 300 })
    productId: string

    @OneToMany(type => Rental, (rental: Rental) => rental.item)
    rentals?: Rental[]
}