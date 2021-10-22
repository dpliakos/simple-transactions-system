import { Injectable, NotImplementedException } from '@nestjs/common';

/**
 * 
 * @class DataProvider 
 * A template service for creating data provider classes
 * 
 */
@Injectable()
export class DataProviderService {
  read(model: string, options: any): unknown {
    throw new NotImplementedException();
  }

  // TODO: describe the rest of the actions
}
