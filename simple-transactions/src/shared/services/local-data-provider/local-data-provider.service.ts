'use strict';
import { Injectable } from '@nestjs/common';
import { DataProviderService } from '../data-provider/data-provider.service';
import * as TRANSACTION_DATA from '../../../../data/transactions.json';

/**
 * 
 * A data provider implementation that uses the local file system to source data
 * 
 */
@Injectable()
export class LocalDataProviderService extends DataProviderService {

  /**
   * 
   * Reads the list of data
   * 
   */
  read(model: string, options: any): unknown {
    if (model === 'transactions') {
      return TRANSACTION_DATA;
    } else {
      return [];
    }
  }

  // TODO: add implementation for the rest of the actions
}
