import React from "react";
import PropTypes from "prop-types";

const styles = {
  message: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center"
  }
};

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.text
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;
    this.interval = window.setInterval(() => {
      this.state.message === `${text}...`
        ? this.setState({ message: text })
        : this.setState(({ message }) => ({ message: `${message}.` }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <div style={styles.message}>{this.state.message}</div>;
  }
}

Loader.propTypes = {
  speed: PropTypes.number,
  text: PropTypes.string
};

Loader.defaultProps = {
  speed: 200,
  text: `Loading`
};

export default Loader;
