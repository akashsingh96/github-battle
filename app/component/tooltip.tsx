import * as React from "react";
import styled from "styled-components";

import withHover from "./withHover";
import Hover from "./hover";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
`;

const StyledTooltip = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 160px;
  bottom: 100%;
  left: 50%;
  margin-left: -80px;
  border-radius: 3px;
  background-color: hsla(0, 0%, 20%, 0.9);
  padding: 7px;
  margin-bottom: 5px;
  color: #fff;
  text-align: center;
  font-size: 14px;
`;

interface ITooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: ITooltipProps) => (
  <Hover>
    {(hovering: boolean) => (
      <StyledContainer>
        {hovering && <StyledTooltip>{text}</StyledTooltip>}
        {children}
      </StyledContainer>
    )}
  </Hover>
);

export default Tooltip;
