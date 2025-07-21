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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'This gets you all the products' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<PaginatedProductsDTO> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.productsService.getProductsService(pageNumber, limitNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'This gets you a product by Id' })
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Products> {
    return this.productsService.getProductByIdService(id);
  }

  @Post()
  @ApiOperation({ summary: 'This is to add a new product (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() request: NewProductDTO): Promise<Products> {
    return this.productsService.createProductService(request);
  }

  @Put(':id')
  @ApiOperation({ summary: 'This updates a product (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateProductDTO,
  ): Promise<Products | null> {
    return this.productsService.updateProductService(id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'This deletes a product (Admin only)' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductIdDTO> {
    return this.productsService.deleteProductService(id);
  }
}
