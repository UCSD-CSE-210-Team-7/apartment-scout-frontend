import React from "react";
import userImage from "../../img/user.png";
import { useQuery, gql } from "@apollo/client";

export const QUERY_CONVERSATIONS = gql`
  query Conversations{
    me {
      conversations {
        conversation_id
        person_a {
          name
          email
        }
        person_b {
          name
          email
        }
        last_msg {
          msg_id
          msg_text
          msg_time
          sender {
            email
            name
          }
        }
      }
    }
  }
`;

const Sidebar = ({ onSelectConversation, user, email }) => {
  let {
    data, 
    loading,
  } = useQuery(QUERY_CONVERSATIONS);

  if (user === null || loading) {
    return <h1>Loading...</h1>;
  }
  
  let conversations = data?.me.conversations

  let sortable = [...conversations];
  console.log(conversations);
  function comparator(a, b) {
    if (email) {
      if (a.person_b.email === email) return -1;
      if (b.person_b.email === email) return 1;
    }
    return new Date(b?.last_msg?.msg_time) - new Date(a?.last_msg?.msg_time);
  }

  sortable.sort(
    comparator
  );
  sortable.sort(
    (a, b) => new Date(b?.last_msg?.msg_time) - new Date(a?.last_msg?.msg_time)
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
          style={{ cursor: "pointer" }}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="userChat" key={conversation.conversation_id}>
            <img src={userImage} alt="" />
            <div className="userChatInfo">
              <span>{conversation.person_b.name}</span>
              {conversation.last_msg && (
                <p>
                  {(conversation.last_msg.sender.email === user.email
                    ? "You: "
                    : "") + conversation.last_msg.msg_text}
                </p>
              )}
            </div>
          </div>
          <hr className="chat-divider" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
