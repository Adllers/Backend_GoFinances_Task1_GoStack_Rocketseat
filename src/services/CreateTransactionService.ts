import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {

  title: string;
  value: number;
  type: 'income' | 'outcome';

}

interface Balance {
  income: number;
  outcome: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type }: Request): Transaction {

    if (type === 'income') {

      const transaction = this.transactionsRepository.create( { title, value, type } );

      return transaction;

    } else if (type === 'outcome') {

      const { total } = this.transactionsRepository.getBalance();

      if ( value <= total ) {

        const transaction = this.transactionsRepository.create( { title, value, type } );

        return transaction;

      } else {

        throw Error('Insufficient Funds!');

      }

    } else {

      throw Error('Transaction type is invalid!');

    }



  }
}

export default CreateTransactionService;
