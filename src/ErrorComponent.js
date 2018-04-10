import React from "react";

const ErrorComponent = props => {
  return props.error ? (
    <div className="alert alert-danger">{props.error || ""}</div>
  ) : null;
};

export default ErrorComponent;
