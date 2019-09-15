import React from "react";
import PropTypes from "prop-types";

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
      selectedLanguage: "All"
    };
    //To make sure whenever and whereever this function is invoked it will be invoked in context of Popular
    this.onUpdateLanguage = this.onUpdateLanguage.bind(this);
    //now this keyword will reference component instance of Popular not LanguagesNav
  }

  onUpdateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    return (
      <>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          onUpdateLanguage={this.onUpdateLanguage}
        />
      </>
    );
  }
}

export default Popular;
