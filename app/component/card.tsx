import * as React from "react";
import { ThemeConsumer } from "../contexts/theme";

interface ICardProps {
  header: string;
  subheader?: string;
  avatar: string;
  href: string;
  login: string;
  children: React.ReactNode; // Should it be React.ReactElement or React.ReactNode
}
export default function Card({
  header,
  subheader,
  avatar,
  href,
  login,
  children
}: ICardProps) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h4 className="header-lg center-text">{header}</h4>
          <img className="avatar" src={avatar} alt={`Avatar for ${login}`} />
          {subheader && <h4 className="center-text">Score: {subheader}</h4>}
          <h2 className="center-text">
            <a className="link" href={href}>
              {login}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}
