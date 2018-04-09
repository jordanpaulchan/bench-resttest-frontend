import React, { Component } from "react";

import { fetchTransactions } from "./RequestUtils";

const URL = "";

class TransactionsContainer extends Component {
  state = {
    loading: false,
    transactions: []
  };

  componentDidMount() {
    this.setState({ transactions: fetchTransactions(URL) });
  }

  render() {
    return <TransactionsTable transactions={this.state.transactions} />;
  }
}

const TransactionsHeader = props => {
  const tableHeaders = props.headers.map(header => (
    <th scope="col">{header}</th>
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
      <td>{transaction.Amount || ""}</td>
    </tr>
  );
};

const TransactionsBody = props => {
  const transactions = props.transactions.map(transaction => (
    <Transaction transaction={transaction} />
  ));

  return <tbody>{transactions}</tbody>;
};

const TransactionsTable = props => (
  <table className="table">
    <TransactionsHeader headers={["Date", "Company", "Account", "Total"]} />
    <TransactionsBody transactions={props.transactions} />
  </table>
);

const Transactions = () => (
  <TransactionsContainer>
    <TransactionsTable />
  </TransactionsContainer>
);

export default Transactions;
