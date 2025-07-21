import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Products } from 'src/entities/Products.entity';

export class ProductImageUploadedDTO {
  @ApiProperty({ example: 'Image uploaded succesfully' })
  @IsString({
    message:
      'This must display a message if the image was uplaoded succesfully',
  })
  message: string;

  product: Products;
}
