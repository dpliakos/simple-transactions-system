import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { SharedModule } from './../../../shared/shared.module';
import { DataProviderService } from './../../../shared/services/data-provider/data-provider.service';
import { LocalDataProviderService } from './../../../shared/services/local-data-provider/local-data-provider.service';
import { TransactionsService } from './../../services/transactions/transactions.service';

describe('TransactionsControllerController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        TransactionsService,
        {
          provide: DataProviderService,
          useClass: LocalDataProviderService
        }
      ],
      controllers: [TransactionsController],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
