import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";
import * as classes from "./Messages.module.css";
const Messages = (props) => {
  return (
    <ScrollToBottom className={classes.messages}>
      {props.messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={props.name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
