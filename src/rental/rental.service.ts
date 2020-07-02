import { Injectable } from '@nestjs/common';
import { Availability } from './interfaces/availability.interface';
import { Rental } from './rental.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';

@Injectable()
export class RentalService {

    constructor(@InjectRepository(Rental) private readonly rentals: Repository<Rental>,
        @InjectRepository(Item) private readonly items: Repository<Item>){
    }
    
    public async doCheckout({ itemId, from, to }: DoCheckoutParams): Promise<boolean> {
        const item = await this.items.findOne(itemId)
        if(!item){
            console.log(`Attempting to checkout an unknown item: ${itemId}`)
            return false
        }
        const rental: Rental = {
            item: item,
            startingDate: from,
            endingDate: to
        }
        await this.rentals.save(rental)
        return true
    }

    public async getAvailabilities({ from, to }: GetAvailabilitiesParams): Promise<Array<Availability>> {
        // to consider that a parcel is available for lease, its last rental is meant to end 
        // 6 days before (2 days to take it back, 2 days to clean it, 2 days to send it), and
        // its next rental starts 6 days after the required period.
        const effectiveFrom = addDays(from, -6)
        const effectiveTo = addDays(to, 6)
        const request = getAvailabilitesRequest(effectiveFrom,effectiveTo)
        const response = await this.items.query(request)
        return response
    }
}

/**
 * given a time window, return a PostgreSQL request that compute, for each product,
 * how many items are available for this period.
 * @param from
 * @param to 
 */
const getAvailabilitesRequest = (from: Date, to: Date) => {
    return `
    select
	item."productId" as product_id,
	count(*) as available
from
	item
where
	(SELECT COUNT(*) FROM rental WHERE rental."itemId" = item.id
		and ((rental."startingDate" <= '${from.toISOString()}' and rental."endingDate" >= '${from.toISOString()}')
		or (rental."startingDate" <= '${to.toISOString()}' and rental."endingDate" >= '${to.toISOString()}'))) = 0
group by 
	item."productId"`
}

export interface DoCheckoutParams {
    itemId: string,
    from: Date
    to: Date
}

export interface GetAvailabilitiesParams {
    from: Date
    to: Date
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
