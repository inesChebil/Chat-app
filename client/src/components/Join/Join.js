import React, { useState } from "react";

import { Link } from "react-router-dom";
import * as classes from "./Join.module.css";
const Join = () => {
  // initial Value for Name is an empty string
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className={classes.joinOuterContainer}>
      <div className={classes.joinInnerContainer}>
        <h1 className={classes.heading}>Join</h1>
        <div>
          <input
            placeholder="Name"
            className={classes.joinInput}
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className={classes.joinInput}
            style={{ marginTop: "20px" }}
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        {/* to prevent the user to pss to the chat page without adding name and room we will be adding onClick event , to do preventDefault*/}
        <Link
          onClick={(event) => (!room || !name ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button
            className={classes.button}
            style={{ marginTop: "20px" }}
            type="submit"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
