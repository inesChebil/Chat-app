import React from "react";
import * as classes from "./InfoBar.module.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
const InfoBar = (props) => {
  return (
    <div className={classes.infoBar}>
      <div className={classes.leftInnerContainer}>
        <img className={classes.onlineIcon} src={onlineIcon} alt="onlineImg" />
        <h3>{props.room}</h3>
      </div>
      <div className={classes.rightInnerContainer}>
        <a href="/">
          <img src={closeIcon} alt="closeImg" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
