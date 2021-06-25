import React from "react";
import AceEditor from "react-ace";
import propTypes from "prop-types";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-github";

const getTheme= isDarkMode => {
  const DEFAULT={
    PlaceHolder: "Write your code here...",
    Mode: "html",
    Name: "editor"
  };
  if (isDarkMode) {
    return {
      ...DEFAULT,
      Theme: "solarized_dark"
    };
  }
  return {
    ...DEFAULT,
    Theme: "github"
  };
};

const Editor=({ setState, state }) => {
  const theme=getTheme(state.darkMode);
  const handleChange=newValue => {
    setState({
      ...state,
      liveSrcDoc: newValue
    });
  };
  return (
    <AceEditor
      placeholder={ theme.PlaceHolder }
      mode={ theme.Mode }
      theme={ theme.Theme }
      name={ theme.Name }
      onChange={ handleChange }
      fontSize={ 14 }
      highlightActiveLine={ true }
      width="100%"
      height="100%"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

Editor.propTypes = {
    setState: propTypes.func,
    state: propTypes.object
};

export default Editor;
