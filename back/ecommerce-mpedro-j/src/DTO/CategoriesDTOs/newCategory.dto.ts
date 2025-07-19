import { IsString, MaxLength } from 'class-validator';

export class NewCategoryDTO {
  @IsString()
  @MaxLength(50)
  name: string;
}
