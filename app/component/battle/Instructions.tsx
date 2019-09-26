import * as React from "react";
import styled from "styled-components";
import { FaFighterJet, FaTrophy, FaUserFriends } from "react-icons/fa";

import { ThemeConsumer } from "../../contexts/theme";

const StyledInstructions = styled.div`
  margin: 100px 0;
  h1 {
    text-align: center;
    font-size: 35px;
    font-weight: 300;
    margin: 20px;
  }
  ol {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    padding: 0;
    font-weight: 500;
    color: inherit;
    font-size: 25px;
    li {
      flex: 1;
      min-width: 300px;
      h3 {
        font-size: 28px;
        font-weight: 300;
        margin: 10px;
      }
    }
    svg {
      padding: 40px;
      border-radius: 3px;
    }
  }
`;

const StyledFaFighterJet = styled(FaFighterJet)`
  color: #727272;
  border-radius: 3px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgb(36, 40, 42)" : "rgba(0, 0, 0, 0.08)"};
`;

const StyledFaTrophy = styled(FaTrophy)`
  color: rgb(255, 215, 0);
  border-radius: 3px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgb(36, 40, 42)" : "rgba(0, 0, 0, 0.08)"};
`;

const StyledFaUserFriends = styled(FaUserFriends)`
  color: rgb(255, 191, 116);
  border-radius: 3px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgb(36, 40, 42)" : "rgba(0, 0, 0, 0.08)"};
`;

export const Instructions: React.SFC = () => (
  <ThemeConsumer>
    {({ theme }) => (
      <StyledInstructions>
        <h1>INSTRUCTIONS</h1>
        <ol>
          <li>
            <h3>Enter two Github users</h3>
            <StyledFaUserFriends theme={theme} size={140} />
          </li>
          <li>
            <h3>Battle</h3>
            <StyledFaFighterJet theme={theme} size={140} />
          </li>
          <li>
            <h3>See the winner</h3>
            <StyledFaTrophy theme={theme} size={140} />
          </li>
        </ol>
      </StyledInstructions>
    )}
  </ThemeConsumer>
);
