import * as React from "react";
import styled from "styled-components";

interface IProps {
  selectedLanguage: string;
  onUpdateLanguage: (language: string) => void;
}

const LanguagesNavWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background: transparent;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }
`;

export const LanguagesNav = ({
  selectedLanguage,
  onUpdateLanguage
}: IProps) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <LanguagesNavWrapper>
      {languages.map(language => (
        <li key={language}>
          <button
            onClick={() => onUpdateLanguage(language)}
            style={{
              color:
                language === selectedLanguage ? "rgb(187, 47, 31)" : "initial",
              cursor: "pointer"
            }}
          >
            {language}
          </button>
        </li>
      ))}
    </LanguagesNavWrapper>
  );
};
