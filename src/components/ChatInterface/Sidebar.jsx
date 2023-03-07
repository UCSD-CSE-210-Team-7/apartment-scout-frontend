import React, { useEffect, useState } from "react";
import userImage from "../../img/user.png";
import { useQuery, gql } from "@apollo/client";

const QUERY_CONVERSATIONS = gql`
  query Conversations($user: String!) {
    conversations(user: $user) {
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
`;

const Sidebar = ({ onSelectConversation, user }) => {
  let {
    data: { conversations } = { conversations: [] },
    loading: conversationsLoading,
    error: conversationsError,
  } = useQuery(QUERY_CONVERSATIONS, { variables: { user: user?.email } });

  if (user === null) {
    return <h1>Loading...</h1>;
  }

  let sortable = [...conversations];
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
