import * as React from "react";

//How to use them with the typescript??

const styles: Record<string, React.CSSProperties> = {
  message: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center"
  }
};

interface IProps {
  speed: number;
  text: string;
}

interface IState {
  message: string;
}

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
    return <div style={styles.message}>{this.state.message}</div>;
  }
}

Loader.defaultProps = {
  speed: 200,
  text: `Loading`
};

export default Loader;
