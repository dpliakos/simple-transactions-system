import { Injectable } from '@nestjs/common';
import { DataProviderService } from './../../../shared/services/data-provider/data-provider.service';
import { TransactionEntity } from './../../../shared/domain/entities/transaction';
const FuzzySet = require('fuzzyset.js');


@Injectable()
export class TransactionsService {

  constructor(
    private readonly _dataProvider: DataProviderService
  ) {

  }

  async getRepeating() {
    const allTransactions = this._dataProvider.read(TransactionEntity.model, {}) as any;
    return this.simpleRepeatingMatching(allTransactions.results as TransactionEntity[]);
  }

  /**
   * 
   * Groups the transactions by their description.
   * It assumes that the repeating transactions have exactly the same description
   * and that their amount is the same
   * 
   * @param transactions 
   */
  simpleRepeatingMatching(transactions: TransactionEntity[]) {
    // find unique descriptions
    const transactionDescriptions = transactions.map(transaction => transaction.description);

    // reduce the descriptions that will be used in the fuzzy search
    const uniqueDescriptions = Array.from(new Set(transactionDescriptions));

    // fuzzy match the descriptions
    const fuzzyMatched = this.fuzzyMatchTokens(uniqueDescriptions);

    // populate the unique transaction types with their transaction items
    for (let transaction of transactions) {
      const indexedDescription = transaction.description;
      if (Array.isArray(fuzzyMatched[indexedDescription]?.transactions)) {
        // if the transaction's description matches with a known key, add it to it's transactions
        fuzzyMatched[indexedDescription].transactions.push(transaction);
      } else {
        // else search for the inner keys
        for (let key of Object.keys(fuzzyMatched)) {
          if (fuzzyMatched[key].keys.includes(transaction.description)) {
            fuzzyMatched[key].transactions.push(transaction);
            break;
          }
        }
      }
    }

    // find the repeating ones
    const repeating = [];
    for (let key of Object.keys(fuzzyMatched)) {
      if (Array.isArray(fuzzyMatched[key].transactions) && fuzzyMatched[key]?.transactions?.length > 1 && this.areRepeating(fuzzyMatched[key].transactions)) {
        repeating.push(fuzzyMatched[key])
      }
    }

    const result = repeating.map((matchedItem) => this.formatRepeatingTransactionResult(matchedItem));
    return result;
  }

  /**
   * 
   * 
   * 
   * @param tokens 
   * @param threshold 
   * @returns 
   */
  fuzzyMatchTokens(tokens: string[], threshold: number = .7) {
    const fuzzyMatched = {};
    const targetTokens = [...tokens];
    
    while (targetTokens.length > 0) {
      const debugToken = targetTokens.splice(0,1)
      const token = debugToken[0];
      const currentDescription = {
        keys: [token],
        transactions: []
      };

      const fuzzySet = new FuzzySet(targetTokens);
        const looselyMatchingKeys = fuzzySet.get(token)
        const matchingKeys = looselyMatchingKeys?.filter(result => result[0] >= threshold) || [];

        if (matchingKeys.length > 0) {
          matchingKeys.forEach((match) => {
            const position = targetTokens.indexOf(match[1]);
            const currentMatch = targetTokens.splice(position, 1);
            currentDescription.keys.push(currentMatch[0]);
          });
        };

        fuzzyMatched[token] = currentDescription;
    }

    return fuzzyMatched;
  }

  /**
   * 
   * Given the list of transactions to the same service provider, find if they
   * are repeating.
   * 
   * This functions assumes the list of transactions are repeating only if
   * there is exactly one transaction for each month/year at the timestamp
   * range.
   * 
   * @param transactions a list of transactions
   * 
   */
  areRepeating(transactions: TransactionEntity[]): boolean {
    const groupedByDate = {};

    for (let transaction of transactions) {
      const timestamp = new Date(transaction.timestamp);
      const key = `${timestamp.getFullYear()}-${timestamp.getMonth()}`;
      if (groupedByDate[key] && groupedByDate[key] > 0) {
        // as soon as a duplicate is found, decide that they are not a repeating transaction
        return false;
      } else {
        groupedByDate[key] = 1;
      }
    }

    return true;
  }

  /**
   * 
   * Formats an item for the repeating response (it should be a pipe)
   * 
   * @param bundle The result of the fuzzy search
   */
  formatRepeatingTransactionResult(bundle) {
    // sort by timestamp desc
    const latestTransaction = bundle?.transactions?.sort((a, b) => {return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()})[0]
    const formatted = {
      description: bundle?.keys[0],
      amount: bundle?.transactions[0]?.amount,
      timestamp: latestTransaction.timestamp
    };

    return formatted;
  }
}
