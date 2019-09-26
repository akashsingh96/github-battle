import * as React from "react";
import styled from "styled-components";

interface IState {
  message: string;
}

interface IProps {
  speed: number;
  text: string;
}

const StyledLoader = styled.div`
  font-size: 35px;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 20px;
  text-align: center;
`;

class Loader extends React.Component<IProps, IState> {
  state = {
    message: this.props.text
  };
  private interval: number | undefined;
  static defaultProps = {
    speed: 200,
    text: `Loading`
  };
  public componentDidMount() {
    const { text, speed } = this.props;
    this.interval = window.setInterval(() => {
      this.state.message === `${text}...`
        ? this.setState({ message: text })
        : this.setState(({ message }) => ({ message: `${message}.` }));
    }, speed);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return <StyledLoader>{this.state.message}</StyledLoader>;
  }
}

Loader.defaultProps = {
  speed: 200,
  text: `Loading`
};

export default Loader;
