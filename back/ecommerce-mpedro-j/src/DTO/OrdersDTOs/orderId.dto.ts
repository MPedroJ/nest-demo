import { PickType } from '@nestjs/swagger';
import { Orders } from 'src/entities/Orders.entity';

export class OrderIdDTO extends PickType(Orders, ['id']) {}
