import React from "react";
import userImage from "../img/user.jpg";

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img src={userImage} alt="user" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
