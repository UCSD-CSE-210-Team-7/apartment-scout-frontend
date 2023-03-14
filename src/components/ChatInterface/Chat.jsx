// Import required dependencies, components and assets.
import React, { useContext, useEffect, useState, useRef } from "react";
import Auth from "../../utils/auth";
import userImg from "../../img/user.png";
import sendButtonImg from "../../img/send_icon.png";
import Loading from '../Loading';

// CSS for the chatpage, chatbox and messages displayed.
const Message = ({ message, sentBySelf }) => {
  const baseStyle = {
    listStyleType: "none",
    maxWidth: "80%",
    margin: "0.5em 2em",
    borderRadius: "1em",
    padding: "1em",
    boxShadow: "0 4px 4px #00000040",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
  };

  const otherStyle = {
    ...baseStyle,
    background: "white",
  };
  const selfStyle = {
    ...baseStyle,
    background: "#537fb7",
    alignSelf: "flex-end",
  };

  const date = new Date(message.msg_time);
  const now = new Date();

  let msg_time = "";

  // displaying the date, and time in hours and minutes when the message is sent.

  if (now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
    msg_time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    msg_time = date.toLocaleString("en-US", {
      year: undefined,
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <div style={sentBySelf ? selfStyle : otherStyle}>
      <p style={{ margin: 0 }}>{message.msg_text}</p>
      <span
        style={{
          fontSize: "0.5em",
          alignSelf: "flex-end",
        }}
      >
        {msg_time}
      </span>
    </div>
  );
};

const Input = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.length > 0) sendMessage(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0.5em",
      }}
    >

      {/* chat functionality of hitting the send button, where the messages should be displayed on the 
      right hand side of the chat when sent. */}

      <input
        type="text"
        placeholder="Type..."
        onKeyPress={(e) => (e.key === "Enter" ? handleSend() : undefined)}
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          flexGrow: 1,
          border: "0.5px solid black",
          background: "#f5f5f5",
          borderRadius: "2em",
          padding: "0 1em",
        }}
      />
      <img
        alt="send-button"
        src={sendButtonImg}
        style={{
          height: "2em",
          width: "2em",
          margin: "0em 1em",
        }}
        onClick={handleSend}
      />
    </div>
  );
};

// chat functionality after authentication of the scouts and requesters and storing all chats and emails.
const Chat = ({ loading, conversation, sendMessage }) => {

  const user = useContext(Auth)?.user?.email;
  const messages = conversation?.messages

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        fontSize: "1.5em",
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      {!conversation ? (
        <h1 style={{ alignSelf: "center" }}>Select a conversation</h1>
      ) : 
        loading ? 
        <Loading/> :
        (
        <>
          <div
            style={{
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1em",
              color: "black",
            }}
          >
            <img alt="profile-pic" src={userImg} className="contact-photo" />
            <span>
              {conversation.person_a.email === user
                ? conversation.person_b.name
                : conversation.person_a.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 2,
              overflowY: "scroll",
            }}
          >
            {messages && messages.map((m) => (
              <Message
                message={m}
                key={m.msg_id}
                sentBySelf={m.sender.email === user}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <Input sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
};

export default Chat;
