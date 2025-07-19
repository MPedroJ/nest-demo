import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class NewCategoryDTO {
  @ApiProperty({
    example: 'keyboard',
    description: 'Name of the category you want to add',
  })
  @IsString({ message: 'The name of the category must be a string' })
  @MaxLength(50, {
    message: "The length of the name shouldn't be greater than 50 characters",
  })
  name: string;
}
