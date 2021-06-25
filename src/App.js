import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  Paper,
  Tooltip,
  makeStyles
} from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import GetAppIcon from "@material-ui/icons/GetApp";
import LiveTvIcon from "@material-ui/icons/LiveTv";

import Editor from "./component/Editor";
import Iframe from "./component/Iframe";
import SwitchLabels from "./component/Switch";
import CONSTANTS from "./constants";
import "./css/App.css";

const { 
  initialState, 
  tooltipTitle,
  alertContent
} = CONSTANTS;

const getStyles = (isDarkMode) => {
  const DEFAULT = {
    Root: "Root",
    PaperTheme: "Paper-theme"
  };
  if (isDarkMode) {
    return {
      ...DEFAULT,
      AppBar: "Appbar-dark-theme",
      Title: "Title-dark-theme",
      Tooltip: "Tooltip-dark-theme"
    };
  }
  return {
    ...DEFAULT,
    AppBar: "Appbar-default-theme",
    Title: "Title-default-theme",
    Tooltip: "Tooltip-default-theme"
  };
};

const useStyles = makeStyles({
  button: {
    "&:hover": {
      border: "1px solid lightgray"
    }
  }
});

function App() {
  const [state, setState] = useState(initialState);
  const classes = useStyles();
  const style = getStyles(state.darkMode);

  const clickExecutionHandler = () => {
    setState({
      ...state,
      playSrcDoc: state.liveSrcDoc,
      isPlayButton: true,
      isLiveButton: false
    });
  };
  const liveExecutionHandler = () => {
    setState({
      ...state,
      isPlayButton: false,
      isLiveButton: true
    });
  };
  const downloadExecutionHandler = () => {
    if(!state.liveSrcDoc) {
      alert(alertContent);
      return;
    }
    const url = window.URL.createObjectURL(new Blob([state.liveSrcDoc]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `download.txt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className={style.Root}>
      <AppBar className={style.AppBar}>
        <Toolbar>
          <Typography variant="h6" className={style.Title}>
            Frontend Editor
          </Typography>

          <Tooltip title={tooltipTitle.run} className={style.Tooltip}>
            <Button className={classes.button}>
              <PlayCircleFilledIcon onClick={clickExecutionHandler} />
            </Button>
          </Tooltip>
          <Tooltip title={tooltipTitle.live} className={style.Tooltip}>
            <Button className={classes.button}>
              <LiveTvIcon onClick={liveExecutionHandler} />
            </Button>
          </Tooltip>
          <Tooltip title={tooltipTitle.download} className={style.Tooltip}>
            <Button color={style.Button} className={classes.button}>
              <GetAppIcon onClick={downloadExecutionHandler} />
            </Button>
          </Tooltip>

          <SwitchLabels state={state} setState={setState} />
        </Toolbar>
      </AppBar>

      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={6}>
          <Paper className={style.PaperTheme}>
            <Editor setState={setState} state={state} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={style.PaperTheme}>
            <Iframe state={state} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default React.memo(App);
