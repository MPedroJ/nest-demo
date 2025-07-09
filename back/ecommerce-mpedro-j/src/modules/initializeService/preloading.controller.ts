import { Controller, Get } from '@nestjs/common';
import { PreloadingService } from './preloading.service';

@Controller('initialize')
export class PreloadingController {
  constructor(private readonly preloadingService: PreloadingService) {}

  @Get('seeder')
  preloadingController(): Promise<void> {
    return this.preloadingService.onModuleInit();
  }
}
