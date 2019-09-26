import * as React from "react";
import styled from "styled-components";

import { fetchRepos } from "../../utils/api";
import Loader from "../loader";
import { LanguagesNav } from "./LanguagesNav";
import { ReposGrid } from "./RepoGrid";

export interface IRepoList {
  owner: { login: string; avatar_url: string };
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

const ErrorWrapper = styled.p`
  text-align: center;
  color: #ff1616;
  font-size: 20px;
  margin: 50px 0;
`;

interface IState {
  selectedLanguage: string;
  error: string | null;
  repos: Record<string, IRepoList[]>;
}

class Popular extends React.Component<{}, IState> {
  state: IState = {
    selectedLanguage: "All",
    repos: {},
    error: null
  };

  public componentDidMount() {
    const { selectedLanguage } = this.state;
    this.onUpdateLanguage(selectedLanguage);
  }

  private onUpdateLanguage = (selectedLanguage: string) => {
    const { repos } = this.state;
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!repos[selectedLanguage]) {
      fetchRepos(selectedLanguage)
        .then((repoList: IRepoList[]) =>
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: repoList }
          }))
        )
        .catch(() =>
          this.setState({
            error: "There was an error fetching this repository"
          })
        );
    }
  };

  public render() {
    const { repos, error, selectedLanguage } = this.state;
    return (
      <>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          onUpdateLanguage={this.onUpdateLanguage}
        />
        {!repos[selectedLanguage] && !error && <Loader text="fetching data" />}
        {error && <ErrorWrapper>{error}</ErrorWrapper>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}

export default Popular;
