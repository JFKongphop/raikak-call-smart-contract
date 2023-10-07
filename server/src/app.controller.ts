import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  running(): string {
    return this.appService.running();
  }

  @Get(':address/:chainId')
  getContractABI(
    @Param('address') address: string,
    @Param('chainId') chainId: number,
  ) {
    return this.appService.getContractABI(address, +chainId);
  }
}
