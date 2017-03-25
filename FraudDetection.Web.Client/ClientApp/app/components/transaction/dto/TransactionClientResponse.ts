import { Transaction} from './transaction'

export class TransactionClientResponse
{
    transaction: Transaction;
    transactionStatus: string;
    message: string;
}

