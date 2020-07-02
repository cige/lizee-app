import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { RentalService, DoCheckoutParams, GetAvailabilitiesParams } from './rental/rental.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly rentalService: RentalService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('checkout')
  async checkout(@Body() body: any) {
    if(!verifiyCheckoutBody(body)){
      return
    }
    const success = await this.rentalService.doCheckout(body)
    if(!success)
      throw new HttpException("the checkout did fail", HttpStatus.BAD_REQUEST)
  }

  @Post('availability')
  async availability(@Body() body: any) {
    if(!verifiyAvailabilityBody(body)){
      return
    }
    const result = await this.rentalService.getAvailabilities(body)
    return result
  }
}

function verifiyCheckoutBody(body: any): body is DoCheckoutParams {
  if(!body)
    throw new HttpException('a body is expected', HttpStatus.BAD_REQUEST)
  if(!body.itemId)
    throw new HttpException('body must specify "itemId"', HttpStatus.BAD_REQUEST)
  if(!body.from)
    throw new HttpException('body must specify "from"', HttpStatus.BAD_REQUEST)
  if(!body.to)
    throw new HttpException('body must specify "to"', HttpStatus.BAD_REQUEST)
  return true
}

function verifiyAvailabilityBody(body: any): body is GetAvailabilitiesParams {
  if(!body)
    throw new HttpException('a body is expected', HttpStatus.BAD_REQUEST)
  if(!body.from)
    throw new HttpException('body must specify "from"', HttpStatus.BAD_REQUEST)
  if(!body.to)
    throw new HttpException('body must specify "to"', HttpStatus.BAD_REQUEST)
  return true
}