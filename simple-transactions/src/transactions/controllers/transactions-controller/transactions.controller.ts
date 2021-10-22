import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './../../../transactions/services/transactions/transactions.service';

@Controller('transactions')
export class TransactionsController {

  constructor(
    private readonly _transactionsService: TransactionsService
  ){ }

  @Get()
  async findAll(): Promise<any> {
    return this._transactionsService.getRepeating();
  }
}
