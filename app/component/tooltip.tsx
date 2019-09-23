import * as React from "react";

import withHover from "./withHover";
import Hover from "./hover";

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    display: "flex"
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px"
  }
};

interface ITooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip({ text, children }: ITooltipProps) {
  return (
    <Hover>
      {(hovering: boolean) => (
        <div style={styles.container}>
          {hovering && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  );
}

export default Tooltip;
