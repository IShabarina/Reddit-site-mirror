import * as React from "react";
import * as ReactDom from "react-dom";
import { App } from "../App";
//import { Header } from "../shared/Header.tsx";

window.addEventListener("load", () => {
  ReactDom.hydrate(<App />, document.getElementById("react_root"));
});
