import React, { Component } from "react";
import "./App.css";

import Header from "./Header";
import Transactions from "./Transactions";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Transactions />
      </div>
    );
  }
}

export default App;
