import React from "react";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
              className="btn-clear nav-link"
              onClick={() => this.handleClick(language)}
              style={
                language === this.state.selectedLanguage
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
}

export default Popular;
