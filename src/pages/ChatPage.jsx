import React, { useState } from "react";
import Sidebar from "../components/ChatInterface/Sidebar";
import Chat from "../components/ChatInterface/Chat";
import "../styles/chat-styles.scss";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  getAuth().onAuthStateChanged(setUser);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const onSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        maxHeight: "90vh",
      }}
    >
      <Sidebar user={user} onSelectConversation={onSelectConversation} email={email}/>
      <Chat conversation={selectedConversation} user={user} />
    </div>
  );
};

export default ChatPage;
