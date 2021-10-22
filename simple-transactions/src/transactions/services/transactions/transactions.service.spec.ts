import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { SharedModule } from './../../../shared/shared.module';
import { DataProviderService } from './../../../shared/services/data-provider/data-provider.service';
import { LocalDataProviderService } from './../../../shared/services/local-data-provider/local-data-provider.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

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
      ]
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
