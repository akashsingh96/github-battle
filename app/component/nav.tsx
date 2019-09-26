import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ThemeConsumer } from "../contexts/theme";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  li {
    margin-right: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
`;

const StyledButton = styled.button`
  font-size: 30px;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const Nav: React.SFC = () => (
  <ThemeConsumer>
    {({ theme, toggleTheme }) => (
      <StyledNav>
        <StyledList>
          <li>
            <StyledNavLink
              to="/"
              exact
              activeStyle={{ color: "rgb(187, 46, 31)" }}
            >
              Popular
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/battle"
              activeStyle={{ color: "rgb(187, 46, 31)" }}
            >
              Battle
            </StyledNavLink>
          </li>
        </StyledList>
        <StyledButton onClick={toggleTheme}>
          {theme === "dark" ? "💡" : "🔦️"}
        </StyledButton>
      </StyledNav>
    )}
  </ThemeConsumer>
);

export default Nav;
