import React, { useState, useEffect } from "react";
// query-string will help us to retrieve data from the url
import queryString from "query-string";
import io from "socket.io-client";
import * as classes from "./Chat.module.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

// location comes from React Router and gives us a prop called location
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [users, setUsers] = useState([]);

  const ENDPOINT = "https://react-chat-application-by-ines.herokuapp.com/";

  // useEffect is activated only if there is a change on Endpoint or location.search
  // another note that to finish the useEFFECT , WE HAVE TO ADD THE RETURN STATEMENT, this is useful for unmounting
  useEffect(() => {
    // Retrieve the data from the url

    const { name, room } = queryString.parse(location.search);
    // pass an endpoint to the server
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});
    console.log(socket);
    return () => {
      socket.emit("disconnect");
      // socket.off() : will turn off this instance of the client socket
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  //this useEffect For handling messages
  useEffect(() => {
    socket.on("message", (message) => {
      // make sure to not mutate the state
      setMessages([...messages, message]);
    });
  }, [messages]);
  // function for sending messages
  const sendMessage = (event) => {
    // in react , when you do a key press or a button click , you have
    // to do prevent default, because otherwise, the page will refresh every time
    event.preventDefault();
    // sendMessage('') means the input will be cleaned after sending message
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // this useEffect for getting all users of this room
  // useEffect(() => {
  //   socket.on("roomData", (roomData) => {
  //     console.log({ roomDate: roomData.users });
  //     const usersNames=roomDate.users.map(user=>user.name)
  //     setUsers([...users, roomData]);
  //   });
  // }, users);
  // console.log({ mesg: message, messages: messages });
  // console.log({ users: users });
  // const style = {
  //   color: "white",
  //   backgroundColor: "red",
  // };
  return (
    // onKeyPress for sending our messages
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* <div style={style}>{users.length}</div> */}
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;
