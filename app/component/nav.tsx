import * as React from "react";
import { NavLink } from "react-router-dom";

import { ThemeConsumer } from "../contexts/theme";

const active = {
  color: "rgb(187, 46, 31)"
};
export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink to="/" exact activeStyle={active} className="nav-link">
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink to="/battle" activeStyle={active} className="nav-link">
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30, cursor: "pointer" }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "💡" : "🔦️"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
