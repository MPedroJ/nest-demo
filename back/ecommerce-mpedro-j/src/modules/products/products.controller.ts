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
import {
  INewProductDTO,
  IPaginatedProducts,
  IProductResponseDTO,
} from 'src/DTO/productDTO';
import { AuthGuard } from '../auth/auth.guard';
import { Products } from 'src/entities/Products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<IPaginatedProducts> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.productsService.getProductsService(pageNumber, limitNumber);
  }

  @Get(':id')
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IProductResponseDTO> {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() request: INewProductDTO): Promise<Products> {
    return this.productsService.createProductService(request);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: Partial<Products>,
  ) {
    return this.productsService.updateProductService(id, request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.deleteProductService(id);
  }
}
