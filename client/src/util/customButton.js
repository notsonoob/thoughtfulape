import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// got fixed the error of not properly showing of the tooltips of
// several components

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="bottom">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
