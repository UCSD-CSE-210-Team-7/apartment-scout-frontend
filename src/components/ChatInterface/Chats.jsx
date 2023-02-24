import React, { useEffect, useState } from "react";
import chatlistData from "./chatlist.json";
import userImage from "../../img/user.jpg";

const Chats = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(chatlistData);
  }, []);

  return (
    <div className="chats">
      {chats.map((chat) => (
        <div>
          <div className="userChat" key={chat.id}>
            <img src={userImage} alt="" />
            <div className="userChatInfo">
              <span>{chat.name}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
          <hr className="chat-divider"/>
        </div>
      ))}
    </div>
  );
};

export default Chats;
