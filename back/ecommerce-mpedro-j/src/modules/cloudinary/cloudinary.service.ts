import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductIdDTO } from 'src/DTO/ProductsDTOs/productId.dto';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}
  async uploadImageService(
    id: ProductIdDTO,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    const product = await this.productsRepository.findOne({
      where: { id: id.id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadImage =
      await this.cloudinaryRepository.uploadImageRepository(file);

    await this.productsRepository.update(
      { id: id.id },
      { imgUrl: uploadImage.secure_url },
    );

    return uploadImage;
  }
}
