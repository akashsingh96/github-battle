import * as React from "react";
import styled from "styled-components";

import { ThemeConsumer } from "../contexts/theme";

interface ICardProps {
  header: string;
  subheader?: string;
  avatar: string;
  href: string;
  login: string;
  children: React.ReactNode;
}

const StyledHeader = styled.h4`
  font-size: 35px;
  font-weight: 300;
  margin: 20px;
  text-align: center;
`;

const StyledAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
`;

const StyledLink = styled.a`
  color: rgb(187, 46, 31);
  text-decoration: none;
  font-weight: bold;
`;

const StyledCard = styled.div`
  margin: 10px 0;
  width: 250px;
  padding: 20px;
  border-radius: 3px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgb(36, 40, 42)" : "rgba(0, 0, 0, 0.08)"};
`;

const Card = ({
  header,
  subheader,
  avatar,
  href,
  login,
  children
}: ICardProps) => (
  <ThemeConsumer>
    {({ theme }) => (
      <StyledCard theme={theme}>
        <StyledHeader>{header}</StyledHeader>
        <StyledAvatar src={avatar} alt={`Avatar for ${login}`} />
        {subheader && <h4 style={{ textAlign: "center" }}>{subheader}</h4>}
        <h2 style={{ textAlign: "center" }}>
          <StyledLink href={href}>{login}</StyledLink>
        </h2>
        {children}
      </StyledCard>
    )}
  </ThemeConsumer>
);

export default Card;
