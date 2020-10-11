import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import ContextWrapper from "./components/ContextWrapper";

ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
