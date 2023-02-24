import React from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="mainChat">
      <div className="chatInfo">
        <span>John</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
