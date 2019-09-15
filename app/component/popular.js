import React from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../utils/api";

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

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null
    };
    //To make sure whenever and whereever this function is invoked it will be invoked in context of Popular
    this.onUpdateLanguage = this.onUpdateLanguage.bind(this);
    //now this keyword will reference component instance of Popular not LanguagesNav
  }

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.onUpdateLanguage(selectedLanguage);
  }

  onUpdateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null
    });

    fetchRepos(selectedLanguage)
      .then(repos => this.setState({ repos }))
      .catch(() =>
        this.setState({ error: "There was an error fetching this repository" })
      );
  }

  render() {
    const { repos, error } = this.state;
    return (
      <>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          onUpdateLanguage={this.onUpdateLanguage}
        />
        {!repos && !error && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </>
    );
  }
}

export default Popular;
