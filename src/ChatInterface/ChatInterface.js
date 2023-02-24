import { useState, useEffect } from "react";
import messagesData from "./messages.json";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  function sendMessage() {
    // Send the message to the server
    // ...

    // Add the message to the list of messages
    setMessages([...messages, { text: messageInput, position: "right" }]);

    // Clear the message input
    setMessageInput("");
  }

  useEffect(() => {
    // Fetch data from an API or database
    setMessages(messagesData);
  }, []);

  return (
    <div>
      {messages && messages.length
        ? messages.map((msg) => <div>{msg.text}</div>)
        : null}
      {messages && messages.length ? (
        <ChatList>
          {messages.map((message) => (
            <ChatItem
              key={message.id}
              avatar={
                message.position === "left"
                  ? "https://randomuser.me/api/portraits/women/21.jpg"
                  : ""
              }
              alt={"Reactjs"}
              title={message.position === "left" ? "Reactjs" : ""}
              subtitle={message.text}
              date={new Date()}
              unread={0}
            />
          ))}
        </ChatList>
      ) : null}
      <Input
        placeholder="Type a message..."
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
        rightButtons={
          <Button
            color="white"
            backgroundColor="black"
            text="Send"
            onClick={sendMessage}
          />
        }
      />
    </div>
  );
}

export default ChatInterface;
