import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Instructions } from "./Instructions";
import { PlayerPreview } from "./PlayerPreview";
import { PlayerInput } from "./PlayerInput";

interface IState {
  playerOne?: string;
  playerTwo?: string;
}

const StyledPlayers = styled.div`
  margin: 100px 0;
  h1 {
    text-align: center;
    font-size: 35px;
    font-weight: 300;
    margin: 20px;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px;
  text-decoration: uppercase;
  letter-spacing: 0.25em;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  max-width: 200px;
  color: #e6e6e6;
  background: #141414;
  margin: 40px auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

class Battle extends React.Component<{}, IState> {
  state: IState = {};
  handleSubmit = (id: keyof IState, player: string) =>
    this.setState({ [id]: player });

  handleReset = (id: keyof IState) => this.setState({ [id]: undefined });

  render() {
    const { playerOne, playerTwo } = this.state;

    return (
      <>
        <Instructions />
        <StyledPlayers>
          <h1>Players</h1>
          <StyledContainer>
            {!playerOne ? (
              <PlayerInput
                label="Player One"
                onSubmit={(player: string) =>
                  this.handleSubmit("playerOne", player)
                }
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label={"Player One"}
                onReset={() => this.handleReset("playerOne")}
              />
            )}
            {!playerTwo ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit("playerTwo", player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label={"Player Two"}
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </StyledContainer>
          {playerOne && playerTwo && (
            <StyledLink
              to={{
                pathname: "/battle/results",
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
            >
              Battle
            </StyledLink>
          )}
        </StyledPlayers>
      </>
    );
  }
}

export default Battle;
