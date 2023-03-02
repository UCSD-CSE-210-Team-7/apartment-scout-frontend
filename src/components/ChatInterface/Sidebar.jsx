import React, { useEffect, useState } from "react";
import userImage from "../../img/user.png";

const Sidebar = ({conversations}) => {
    console.log(conversations)
  return (
    <div className="sidebar">
        <div className="chats">
          {conversations.map(conversation => (
            <div>
              <div className="userChat" key={conversation.conversation_id}>
                <img src={userImage} alt="" />
                <div className="userChatInfo">
                  <span>{conversation.person_b.name}</span>
                  <p>{conversation.last_msg.msg_text}</p>
                </div>
              </div>
              <hr className="chat-divider"/>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Sidebar;
