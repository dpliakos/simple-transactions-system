/**
 * 
 * @class TransactionEntity
 * Describes a transaction object
 * 
 */
export class TransactionEntity {
  static model: string = 'transactions';
  transactionId: string;
  description: string;
  timestamp: Date;
  transactionType: string;
  transactionCategory: string;
  transactionClassification: any[];
  amount: number;
  currency: string;
  meta: any;
}
