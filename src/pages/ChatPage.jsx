import React, {useEffect, useState, useContext} from "react";
import Sidebar from "../components/ChatInterface/Sidebar";
import Chat from "../components/ChatInterface/Chat";
import "../styles/chat-styles.scss";
import messageData from "../dummy_data/messages_.json";
import conversationData from "../dummy_data/chatlist.json";

const ChatPage = () => {
    const user = {
        email: 'skulkarn@ucsd.edu'
    }

    // console.log(conversations, conversationsLoading, conversationsError)
    // console.log(messages)

    const [selectedConversation, setSelectedConversation]= useState(null)

    const onSelectConversation = conversation => {
        setSelectedConversation(conversation)
        // getMessages({ variables: {conversation_id: conversation.conversation_id}})
    }

    // if(conversationsLoading || messagesLoading)
        // return <h1>Loading...</h1>

    return (
      <div style={{
          display: 'flex',
          flexGrow: 1,
          maxHeight: '100vh',
      }}>
          <Sidebar user={user} onSelectConversation={onSelectConversation}/>
          <Chat conversation={selectedConversation} user={user}/>
      </div>
    );
};

export default ChatPage;
