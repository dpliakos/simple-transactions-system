import { Test, TestingModule } from '@nestjs/testing';
import { LocalDataProviderService } from './local-data-provider.service';

describe('LocalDataProviderService', () => {
  let service: LocalDataProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalDataProviderService],
    }).compile();

    service = module.get<LocalDataProviderService>(LocalDataProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
