import { Categories } from 'src/entities/Categories.entity';

export class NewCategoryResponseDTO {
  message: string;

  newCategory: Categories;
}
