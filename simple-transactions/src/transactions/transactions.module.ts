import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions-controller/transactions.controller';
import { SharedModule } from './../shared/shared.module';
import { TransactionsService } from './services/transactions/transactions.service';
import { DataProviderService } from './../shared/services/data-provider/data-provider.service';
import { LocalDataProviderService } from './../shared/services/local-data-provider/local-data-provider.service';
@Module({
  imports: [
    SharedModule
  ],
  controllers: [
    TransactionsController
  ],
  providers: [
    TransactionsService,
    { // use the LocalDataProviderService as data source.
      // You can override this in the testing module in order
      // to have a testing data set
      provide: DataProviderService,
      useClass: LocalDataProviderService
    }
  ]
})
export class TransactionsModule {
}
