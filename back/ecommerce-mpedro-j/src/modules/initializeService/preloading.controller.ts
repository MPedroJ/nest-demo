import { Controller, Get } from '@nestjs/common';
import { PreloadingService } from './preloading.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('initialize')
@ApiTags('Preloading')
export class PreloadingController {
  constructor(private readonly preloadingService: PreloadingService) {}

  @Get('seeder')
  @ApiOperation({
    summary:
      'This is a preloading of categories and products, it loads when the server start',
  })
  preloadingController(): Promise<void> {
    return this.preloadingService.onModuleInit();
  }
}
