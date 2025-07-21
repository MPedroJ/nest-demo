import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductImageUploadedDTO } from 'src/DTO/CloudinaryDTOs/ProductImageUploaded.dto';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}
  async uploadImageService(
    id: string,
    file: Express.Multer.File,
  ): Promise<ProductImageUploadedDTO> {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadImage =
      await this.cloudinaryRepository.uploadImageRepository(file);

    await this.productsRepository.update(
      { id: id },
      { imgUrl: uploadImage.secure_url },
    );

    return { message: 'Image uploaded succesfully', product };
  }
}
