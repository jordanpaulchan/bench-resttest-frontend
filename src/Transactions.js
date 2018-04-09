import React, { Component } from "react";
import _ from "lodash";

import { fetchTransactions } from "./RequestUtils";

const URL = "http://resttest.bench.co/transactions";

function convertToCurrency(amount) {
  if (!amount) {
    return amount;
  }

  if (amount[0] === "-") {
    return `-$${amount.slice(1)}`;
  } else {
    return `$${amount}`;
  }
}

class TransactionsContainer extends Component {
  state = {
    loading: false,
    transactions: [],
    error: null
  };

  componentDidMount() {
    fetchTransactions(URL)
      .then(transactions => {
        const sortedTransactions = _.sortBy(transactions, ["Date"]);
        this.setState({ transactions: sortedTransactions });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return <TransactionsTable transactions={this.state.transactions} />;
  }
}

const TransactionsHeader = props => {
  const tableHeaders = props.headers.map((header, idx) => (
    <th key={idx} scope="col">
      {header}
    </th>
  ));

  return (
    <thead className="thead-dark">
      <tr>{tableHeaders}</tr>
    </thead>
  );
};

const Transaction = props => {
  const { transaction } = props;
  return (
    <tr>
      <th scope="row">{transaction.Date || ""}</th>
      <td>{transaction.Company || ""}</td>
      <td>{transaction.Ledger || ""}</td>
      <td>{convertToCurrency(transaction.Amount || "")}</td>
    </tr>
  );
};

const TransactionsBody = props => {
  const transactions = props.transactions.map((transaction, idx) => (
    <Transaction key={idx} transaction={transaction} />
  ));

  return <tbody>{transactions}</tbody>;
};

const TransactionsTotal = props => {
  const total = props.transactions.reduce(
    (acc, transaction) => acc + parseFloat(transaction["Amount"]) || 0,
    0
  );
  return convertToCurrency(`${total}`);
};

const TransactionsTable = props => {
  const headers = ["Date", "Company", "Account"];
  // Add the transactions total to the header
  headers.push(<TransactionsTotal transactions={props.transactions} />);
  return (
    <table className="table">
      <TransactionsHeader headers={headers} />
      <TransactionsBody transactions={props.transactions} />
    </table>
  );
};

const Transactions = () => (
  <TransactionsContainer>
    <TransactionsTable />
  </TransactionsContainer>
);

export default Transactions;
