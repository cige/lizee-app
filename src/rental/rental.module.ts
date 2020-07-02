import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { Item } from './item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rental, Item])],
    providers: [RentalService],
    exports: [RentalService]
})
export class RentalModule {}
