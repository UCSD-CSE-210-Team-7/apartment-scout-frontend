import React, { useContext } from "react";
import Auth from "../../utils/auth";
import userImage from "../../img/user.png";

const Sidebar = ({ conversations, selectedConversation, onSelectConversation }) => {
  const user = useContext(Auth)?.user?.email;

  if (!conversations)
    return <h1>Loading...</h1>;

  let sortable = [...conversations];
  sortable.sort(
    (a, b) => new Date(b.messages[b.messages.length-1]?.msg_time) - new Date(a.messages[a.messages.length-1]?.msg_time)
  );
  conversations = [...sortable];

  return (
    <div
      style={{
        background: "#D9D9D9",
        width: "20em",
      }}
    >
      {conversations.map((conversation) => (
        <div
          key={conversation.conversation_id}
          onClick={() => onSelectConversation(conversation.conversation_id)}
          style={conversation.conversation_id === selectedConversation ? {background: '#ADE8F4', cursor: 'pointer'} : {cursor: 'pointer'}}
        className="userChat"
        >
          <img src={userImage} alt="" />
          <div className="userChatInfo">
            <span>{conversation.person_b.name}</span>
            {conversation.last_msg && (
              <p>
                {(conversation.last_msg.sender.email === user
                  ? "You: "
                  : "") + conversation.last_msg.msg_text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
