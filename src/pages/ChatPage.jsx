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

    const sendMessage = m => {
        const message = {
            msg_text: m,
            msg_time: Date.now(),
            sender: user
        }
        console.log(message)
        // setMessages([...messages, message])
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
      <div className="home">
        <div className="container">
          <Sidebar user={user} onSelectConversation={onSelectConversation}/>
          <Chat conversation={selectedConversation} user={user} sendMessage={sendMessage}/>
        </div>
      </div>
    );
};

export default ChatPage;
