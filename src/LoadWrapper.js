import React from "react";

import "./LoadWrapper.css";

const LoadWrapper = props => {
  return (
    <div className="LoadingComponent">
      {props.loading && (
        <div className="LoadingComponent__loading">
          <div className="LoadingComponent__loading__loader" />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default LoadWrapper;
