import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import userImg from "../../img/user.jpg";

const Chat = () => {
  return (
    <div className="mainChat">
      <div className="chatHeader">
        <img src={userImg} className="contact-photo" />
        <span>John</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
