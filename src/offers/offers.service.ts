import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  create(createOfferDto: CreateOfferDto) {
    return 'This action adds a new offer';
  }

  findAll() {
    return `This action returns all offers`;
  }

  findById(id: number) {
    return `This action returns a #${id} offer`;
  }
}
