import React from "react";
import ReactDOM from "react-dom";
import {
  TransactionsTable,
  TransactionsHeader,
  TransactionsBody,
  Transaction
} from "./Transactions";

const transaction = {
  Date: "2013-12-22",
  Ledger: "Phone & Internet Expense",
  Amount: "-110.71",
  Company: "SHAW CABLESYSTEMS CALGARY AB"
};
const transactions = [transaction];

it("renders without crashing", () => {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  ReactDOM.render(<Transaction transaction={transaction} />, tbody);
  ReactDOM.unmountComponentAtNode(table);
  ReactDOM.unmountComponentAtNode(tbody);
});

it("renders without crashing", () => {
  const table = document.createElement("table");
  ReactDOM.render(<TransactionsBody transactions={transactions} />, table);
  ReactDOM.unmountComponentAtNode(table);
});

it("renders without crashing", () => {
  const table = document.createElement("table");
  ReactDOM.render(<TransactionsHeader headers={["Test"]} />, table);
  ReactDOM.unmountComponentAtNode(table);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TransactionsTable transactions={transactions} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
