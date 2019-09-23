import * as React from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { ThemeConsumer } from "../contexts/theme";

interface IPlayerInputState {
  username: string;
}
interface IPlayerInputProps {
  label: string;
  onSubmit: (player: string) => void;
}

interface IPlayerPreviewProps {
  username?: string;
  onReset: () => void;
  label: string;
}

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="instructions-container">
          <h1 className="center-text header-lg">INSTRUCTIONS</h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h3 className="header-sm">Enter two Github users</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color="rgb(255, 191, 116)"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">Battle</h3>
              <FaFighterJet
                className={`bg-${theme}`}
                color="#727272"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">See the winner</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color="rgb(255, 215, 0)"
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
}

class PlayerInput extends React.Component<
  IPlayerInputProps,
  IPlayerInputState
> {
  state = { username: "" };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ username: event.target.value });

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <button
                type="submit"
                className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

function PlayerPreview({ username, onReset, label }: IPlayerPreviewProps) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="column player">
          <h3 className="player-label">{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className="player-info">
              <img
                className="avatar-small"
                src={`https://github.com/${username}.png?size=200`}
                alt={`Avatar for ${username}`}
              />
              <a href={`https://github.com/${username}`} className="link">
                {username}
              </a>
            </div>
            <button className="btn-clear flex-center" onClick={onReset}>
              <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

interface IBattleState {
  playerOne?: string;
  playerTwo?: string;
}

class Battle extends React.Component<{}, IBattleState> {
  state: IBattleState = {};
  handleSubmit = (id: keyof IBattleState, player: string) =>
    this.setState({ [id]: player });

  handleReset = (id: keyof IBattleState) => this.setState({ [id]: undefined });

  render() {
    const { playerOne, playerTwo } = this.state;

    return (
      <>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
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
          </div>
          {playerOne && playerTwo && (
            <Link
              className="btn dark-btn btn-space"
              to={{
                pathname: "/battle/results",
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </>
    );
  }
}

export default Battle;
