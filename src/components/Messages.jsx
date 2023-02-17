import React, { useEffect, useState } from "react";
import Message from "./Message";
import messagesData from "./messages_.json";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
