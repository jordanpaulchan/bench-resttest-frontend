import React from "react";
import ReactDOM from "react-dom";
import ErrorComponent from "./ErrorComponent";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorComponent error="Test Error" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
