import * as React from "react";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";

import { ThemeConsumer } from "../../contexts/theme";

interface IPlayerPreviewProps {
  username?: string;
  onReset: () => void;
  label: string;
}

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgb(36, 40, 42)" : "rgba(0, 0, 0, 0.08)"};
  button {
    border: none;
    cursor: pointer;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledPlayerPreview = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  h3 {
    font-size: 20px;
    margin: 5px 0;
    font-weight: 300;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  a {
    margin-left: 10px;
    color: rgb(187, 46, 31);
    text-decoration: none;
    font-weight: bold;
  }
`;

const StyledFaTimesCircle = styled(FaTimesCircle)`
  color: rgb(194, 57, 42);
`;

//SFC??
export const PlayerPreview = ({
  username,
  onReset,
  label
}: IPlayerPreviewProps) => (
  <ThemeConsumer>
    {({ theme }) => (
      <StyledPlayerPreview>
        <h3>{label}</h3>
        <PlayerInfoContainer theme={theme}>
          <PlayerInfo>
            <img
              src={`https://github.com/${username}.png?size=200`}
              alt={`Avatar for ${username}`}
            />
            <a href={`https://github.com/${username}`}>{username}</a>
          </PlayerInfo>
          <button onClick={onReset}>
            <StyledFaTimesCircle size={26} />
          </button>
        </PlayerInfoContainer>
      </StyledPlayerPreview>
    )}
  </ThemeConsumer>
);
