import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users.entity';

export class UserIdDTO extends PickType(Users, ['id']) {}
