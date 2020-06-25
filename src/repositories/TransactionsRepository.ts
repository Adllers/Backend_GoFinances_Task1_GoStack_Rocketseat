import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {

    this.transactions = [];

  }

  public all(): Transaction[] {

    return this.transactions;

  }

  public getBalance(): Balance {

    // let income = 0;
    // let outcome = 0;

    // const transactions = this.transactions;

    // for (let i = 0; transactions.length; i++) {
    //   if (transactions[i].type = 'income') {
    //     income += transactions[i].value;
    //   } else {
    //     outcome += transactions[i].value;
    //   }
    // }

    // const total = income - outcome;

    // return { income , outcome , total };

    const {income, outcome} = this.transactions.reduce((accumulator, transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += transaction.value;
          break;
        case 'outcome':
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      }

      return accumulator;
    }, {
      income: 0,
      outcome: 0,
    });

    const total = income - outcome;

    return { income , outcome , total };

  };





  public create({ title, value, type }: CreateTransactionDTO ): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
