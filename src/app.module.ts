import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { RentalModule } from './rental/rental.module';
import { Item } from './rental/item.entity';
import { Repository } from 'typeorm';
import { Rental } from './rental/rental.entity';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RentalModule,
  TypeOrmModule.forFeature([Item, Rental])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {

  constructor(@InjectRepository(Item) private readonly items: Repository<Item>,
    @InjectRepository(Rental) private readonly rentals: Repository<Rental>) { }

  async onApplicationBootstrap() {
    console.log("creating demo items...")
    await this.registerDemoItems()
    console.log('demo items created!'),
      console.log("creating demo rentals...")
    await this.registerDemoRentals()
    console.log('demo rentals created!')

    console.log('demo env is ready')
    console.log('you may want to run `npm run demo:test`')
  }

  private async registerDemoItems() {
    console.log('Our catalog contains 10 tents...')
    for (let i = 1; i <= 10; i++) {
      await this.items.save({
        productId: 'tent',
        id: `tent#${i}`
      })
      console.log(`\ttent#${i}`)
    }
    // and 3 pair of shoes
    console.log('...and 3 pair of shoes.')
    for (let i = 1; i <= 3; i++) {
      await this.items.save({
        productId: 'shoes',
        id: `shoes#${i}`
      })
      console.log(`\tshoes#${i}`)
    }
  }

  private async registerDemoRentals() {
    const isEmpty = (await this.rentals.count()) === 0
    if(!isEmpty){
      console.warn('(Rentals already created)') 
      return
    }

    console.log('About rentals:') 
    console.log('-Shoes are available at any time') 

    console.log('-The first 7 tents are unavailable for april 2021')
    for (let i = 1; i <= 7; i++) {
      const tent = await this.items.findOne(`tent#${i}`)
      await this.rentals.save({
        item: tent,
        startingDate: new Date('2021-04-01'),
        endingDate: new Date('2021-05-01'),
      })
    }
    console.log('-tent#8 will be returned the 22nd of April 2021')
    const tent8 = await this.items.findOne(`tent#8`)
    await this.rentals.save({
      item: tent8,
      startingDate: new Date('2021-04-01'),
      endingDate: new Date('2021-04-22'),
    })
    console.log('-tent#9 and tent#10 will be returned the 15th of April 2021')
    const tent9 = await this.items.findOne(`tent#9`)
    const tent10 = await this.items.findOne(`tent#10`)
    await this.rentals.save({
      item: tent9,
      startingDate: new Date('2021-04-01'),
      endingDate: new Date('2021-04-15'),
    })
    await this.rentals.save({
      item: tent10,
      startingDate: new Date('2021-04-01'),
      endingDate: new Date('2021-04-15'),
    })
    console.log('-tent#9 is assigned for a rental starting the 9th of May 2021')
    await this.rentals.save({
      item: tent9,
      startingDate: new Date('2021-05-04'),
      endingDate: new Date('2021-05-15'),
    })
  }
}
