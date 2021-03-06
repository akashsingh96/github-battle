import React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

import { fetchRepos } from "../utils/api";
import Card from "./card";
import Loader from "./loader";
import Tooltip from "./tooltip";

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            onClick={() => onUpdateLanguage(language)}
            style={
              language === selectedLanguage
                ? { color: "rgb(187, 47, 31) " }
                : null
            }
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
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
              <ul className="card-list">
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
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: {},
    error: null
  };

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.onUpdateLanguage(selectedLanguage);
  }

  onUpdateLanguage = selectedLanguage => {
    const { repos } = this.state;
    this.setState({
      selectedLanguage,
      error: null
    });

    !repos[selectedLanguage] &&
      fetchRepos(selectedLanguage)
        .then(repoList =>
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: repoList }
          }))
        )
        .catch(() =>
          this.setState({
            error: "There was an error fetching this repository"
          })
        );
  };

  render() {
    const { repos, error, selectedLanguage } = this.state;
    return (
      <>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          onUpdateLanguage={this.onUpdateLanguage}
        />
        {!repos[selectedLanguage] && !error && <Loader text="fetching data" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}

export default Popular;
