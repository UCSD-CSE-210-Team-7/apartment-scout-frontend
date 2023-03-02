import React, {useEffect, useState, useContext} from "react";
import Sidebar from "../components/ChatInterface/Sidebar";
import Chat from "../components/ChatInterface/Chat";
import "../styles/chat-styles.scss";
import messageData from "../dummy_data/messages_.json";
import conversationData from "../dummy_data/chatlist.json";
import Auth from '../utils/auth';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);

    const auth = useContext(Auth)

    const user = {
        email: 'skulkarn@ucsd.edu'
    }

    useEffect(() => {
        setMessages(messageData.data.messages);
        const conversations = conversationData.data.conversations
        conversations.sort((a,b) => -1 * (Date.parse(a.last_msg.msg_time) - Date.parse(b.last_msg.msg_time)))
        setConversations(conversations)
    }, []);

    const sendMessage = m => {
        const message = {
            msg_text: m,
            msg_time: Date.now(),
            sender: user
        }
        setMessages([...messages, message])
    }

    return (
      <div className="home">
        <div className="container">
          <Sidebar conversations={conversations}/>
          <Chat messages={messages} user={user} sendMessage={sendMessage}/>
        </div>
      </div>
    );
};

export default ChatPage;
