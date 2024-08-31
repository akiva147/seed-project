import { Controller, Get } from '@nestjs/common';
import { Public } from '../../decorators/publicRoute.decorator.js';

@Controller('health')
@Public()
export class HealthController {
  @Get()
  healthResponse() {
    return `Server up and running
    version: ${process.env.npm_package_version}`;
  }
}
