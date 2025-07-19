import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Products } from 'src/entities/Products.entity';
import { PaginatedProductsDTO } from 'src/DTO/ProductsDTOs/paginatedProducts.dto';
import { NewProductDTO } from 'src/DTO/ProductsDTOs/newProduct.dto';
import { ProductIdDTO } from 'src/DTO/ProductsDTOs/productId.dto';
import { UpdateProductDTO } from 'src/DTO/ProductsDTOs/updateProduct.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<PaginatedProductsDTO> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.productsService.getProductsService(pageNumber, limitNumber);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Products> {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  createProduct(@Body() request: NewProductDTO): Promise<Products> {
    return this.productsService.createProductService(request);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateProductDTO,
  ): Promise<Products | null> {
    return this.productsService.updateProductService(id, request);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductIdDTO> {
    return this.productsService.deleteProductService(id);
  }
}
