import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import Popular from "./component/popular";
import Battle from "./component/battle";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./component/nav";
import Results from "./component/results";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      toggleTheme: () =>
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light"
        }))
    };
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Route exact path="/" component={Popular} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
