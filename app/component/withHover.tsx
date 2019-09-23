import * as React from "react";

// interface IwithHoverProps{
//   Component:React.ReactNode,
//   propName:string
// }

// Using HOC with typescript

interface IWithHoverProps {
  propName?: string;
}
function withHover<P extends object>(
  Component: React.ComponentType<P>,
  propName = "hovering"
) {
  return class WithHover extends React.Component<P & IWithHoverProps> {
    state = {
      hovering: false
    };

    mouseOver = () => {
      this.setState({
        hovering: true
      });
    };

    mouseOut = () => {
      this.setState({
        hovering: false
      });
    };

    render() {
      const props = { [propName]: this.state.hovering, ...this.props };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}

export default withHover;
