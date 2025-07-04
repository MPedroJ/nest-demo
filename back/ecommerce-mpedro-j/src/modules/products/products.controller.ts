import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  INewProductDTO,
  IPaginatedProducts,
  IProductResponseDTO,
} from 'src/DTO/productDTO';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): IPaginatedProducts {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.productsService.getProductsService(pageNumber, limitNumber);
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') id: number): IProductResponseDTO {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createProduct(@Body() request: INewProductDTO): IProductResponseDTO {
    return this.productsService.createProductService(request);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateProduct(@Param('id') id: number) {
    return this.productsService.updateProductService(Number(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteProduct(@Param('id') id: number): number {
    return this.productsService.deleteProductService(Number(id));
  }
}
