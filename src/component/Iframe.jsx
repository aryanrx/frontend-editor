import React from "react";
import propTypes from "prop-types";
import "../css/Iframe.css";

const getTheme = (isDarkMode) => {
  if (isDarkMode) {
    return {
      style: "Iframe-dark-theme"
    };
  }
  return {
    style: "Iframe-default-theme"
  };
};

const Iframe = ({ state }) => {
  const srcData = state.isLiveButton ? state.liveSrcDoc : state.playSrcDoc;
  const theme = getTheme(state.darkMode);
  return (
    <iframe className={theme.style} srcDoc={srcData} />
  )
};

Iframe.propTypes = {
    state: propTypes.object
};

export default React.memo(Iframe);
