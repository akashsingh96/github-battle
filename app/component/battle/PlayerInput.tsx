import * as React from "react";
import styled from "styled-components";

import { ThemeConsumer } from "../../contexts/theme";

interface IState {
  username: string;
}
interface IProps {
  label: string;
  onSubmit: (player: string) => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  label {
    font-size: 20px;
    margin: 5px 0;
    font-weight: 300;
  }
`;

const StyledPlayerInputs = styled.div`
  display: flex;
  flex-direction: row;

  button {
    padding: 10px;
    margin-left: 10px;
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
    ${({ theme }) =>
      theme === "light"
        ? `
    color:#e6e6e6;
    background-color:#141414
    `
        : `
    color:#000;
    background-color:#aaa8a8
    `}
    :disabled {
      ${({ theme }) =>
        theme === "dark"
          ? `
      background-color:#292929;
      color:#4a4a4a
      `
          : `
      font-weight: 500;
      color: inherit;
      background: #f2f2f2;
      color: #c7c7c7;`};
    }
  }
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  flex: 2;
  border-radius: 3px;
  border: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
  ${({ theme }) =>
    theme === "dark"
      ? `color:#dadada;
        background-color:rgba(0, 0, 0, 0.3)`
      : `background-color:rgba(0, 0, 0, 0.02)`}
`;

export class PlayerInput extends React.Component<IProps, IState> {
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
          <StyledForm onSubmit={this.handleSubmit}>
            <label htmlFor="username">{this.props.label}</label>
            <StyledPlayerInputs theme={theme}>
              <StyledInput
                type="text"
                id="username"
                theme={theme}
                placeholder="github username"
                autoComplete="off"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <button type="submit" disabled={!this.state.username}>
                Submit
              </button>
            </StyledPlayerInputs>
          </StyledForm>
        )}
      </ThemeConsumer>
    );
  }
}
