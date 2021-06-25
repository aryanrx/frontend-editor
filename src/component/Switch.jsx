import React from "react";
import propTypes from "prop-types";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SwitchLabels=({ state, setState }) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={ state.darkMode }
            onChange={(e) =>
              setState({
                ...state,
                [e.target.name]: e.target.checked
              })
            }
            name = "darkMode"
          />
        }
      />
    </FormGroup>
  );
};

SwitchLabels.propTypes = {
  state: propTypes.object,
  setState: propTypes.func
};

export default React.memo(SwitchLabels);
