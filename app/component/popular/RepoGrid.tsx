import * as React from "react";
import styled from "styled-components";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

import Card from "../card";
import Tooltip from "../tooltip";

export interface IRepoList {
  owner: { login: string; avatar_url: string };
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

interface IProps {
  repos: IRepoList[];
}

const StyledCardList = styled.ul`
  margin: 20px 0;
  font-size: 20px;
  li {
    display: flex;
    align-items: center;
    margin: 10px;
  }
  svg {
    margin-right: 10px;
  }
  a {
    font-weight: 500;
    color: inherit;
    text-decoration: none;
  }
`;

const ReposGridContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ReposGrid = ({ repos }: IProps) => {
  return (
    <ReposGridContainer>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              login={login}
            >
              <StyledCardList>
                <Tooltip text="Github username">
                  <li>
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </li>
                </Tooltip>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </StyledCardList>
            </Card>
          </li>
        );
      })}
    </ReposGridContainer>
  );
};
