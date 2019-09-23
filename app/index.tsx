import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./component/nav";
import Loading from "./component/loader";

const Popular = React.lazy(() => import("./component/popular"));
const Battle = React.lazy(() => import("./component/battle"));
const Results = React.lazy(() => import("./component/results"));

export interface IState {
  theme: string;
  toggleTheme: () => void;
}

class App extends React.Component<{}, IState> {
  state = {
    theme: "light",
    toggleTheme: () =>
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light"
      }))
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular} />
                  <Route exact path="/battle" component={Battle} />
                  <Route path="/battle/results" component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
