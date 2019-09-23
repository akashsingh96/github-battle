import * as React from "react";

interface IHoverProps {
  children: (hovering: boolean) => React.ReactNode;
}

interface IHoverState {
  hovering: boolean;
}
class Hover extends React.Component<IHoverProps, IHoverState> {
  state = { hovering: false };

  mouseOver = () => this.setState({ hovering: true });

  mouseOut = () => this.setState({ hovering: false });

  render() {
    const { hovering } = this.state;
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {/* How to fix this issue */}
        {this.props.children(hovering)}
      </div>
    );
  }
}

export default Hover;
