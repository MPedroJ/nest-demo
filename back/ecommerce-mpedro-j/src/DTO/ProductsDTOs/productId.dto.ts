import { PickType } from '@nestjs/swagger';
import { Products } from 'src/entities/Products.entity';

export class ProductIdDTO extends PickType(Products, ['id']) {}
