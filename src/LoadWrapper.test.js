import React from "react";
import ReactDOM from "react-dom";
import LoadWrapper from "./LoadWrapper";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoadWrapper loading={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
