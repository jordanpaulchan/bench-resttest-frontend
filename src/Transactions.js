import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";

import { fetchTransactions } from "./RequestUtils";

import ErrorComponent from "./ErrorComponent";

const URL = "http://resttest.bench.co/transactions";

function convertToCurrency(amount) {
  if (amount < 0) {
    return `-$${Math.abs(amount).toFixed(2)}`;
  } else {
    return `$${amount.toFixed(2)}`;
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
        const sortedTransactions = _.orderBy(transactions, ["Date"], ["desc"]);
        this.setState({ transactions: sortedTransactions });
      })
      .catch(error => {
        this.setState({ error: error.error });
      });
  }

  render() {
    return (
      <TransactionsTable
        transactions={this.state.transactions}
        error={this.state.error}
      />
    );
  }
}

export const TransactionsHeader = props => {
  const tableHeaders = props.headers.map((header, idx) => (
    <th key={idx} scope="col">
      {header}
    </th>
  ));

  return (
    <thead className="thead-light">
      <tr>{tableHeaders}</tr>
    </thead>
  );
};

export const Transaction = props => {
  const { transaction } = props;
  const amount = parseFloat(transaction.Amount) || 0;
  return (
    <tr className={classnames({ "table-success": amount > 0 })}>
      <th scope="row">{transaction.Date || ""}</th>
      <td>{transaction.Company || ""}</td>
      <td>{transaction.Ledger || ""}</td>
      <td>{convertToCurrency(amount)}</td>
    </tr>
  );
};

export const TransactionsBody = props => {
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
  return convertToCurrency(total);
};

export const TransactionsTable = props => {
  const headers = ["Date", "Company", "Account"];
  // Add the transactions total to the header
  headers.push(<TransactionsTotal transactions={props.transactions} />);
  return (
    <div className="container">
      <ErrorComponent error={props.error} />
      <table className="table">
        <TransactionsHeader headers={headers} />
        <TransactionsBody transactions={props.transactions} />
      </table>
    </div>
  );
};

const Transactions = () => <TransactionsContainer />;

export default Transactions;
