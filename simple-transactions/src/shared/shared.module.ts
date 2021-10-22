import { Module } from '@nestjs/common';
import { DataProviderService } from './services/data-provider/data-provider.service';
import { LocalDataProviderService } from './services/local-data-provider/local-data-provider.service';

@Module({
  providers: [
    DataProviderService,
    LocalDataProviderService
  ],
  exports: [
    DataProviderService,
    LocalDataProviderService
  ]
})
export class SharedModule {}
