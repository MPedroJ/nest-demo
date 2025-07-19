import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryRepository } from './cloudinary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [CloudinaryService, CloudinaryConfig, CloudinaryRepository],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
