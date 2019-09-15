import React from "react";
import ReactDom from "react-dom";

import "./index.css";
import Popular from "./component/popular";
import Battle from "./component/battle";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
