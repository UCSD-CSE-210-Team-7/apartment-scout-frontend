import React, { useEffect, useState } from "react";
import userImage from "../../img/user.png";
import { useQuery, gql } from "@apollo/client";

const QUERY_CONVERSATIONS = gql`
    query Conversations($user: String!){
        conversations(user: $user) {
            conversation_id
            person_a{
                name
                email
            }
            person_b{
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


const Sidebar = ({onSelectConversation, user}) => {

    const { 
        data: { conversations } = { conversations: [] }, 
        loading: conversationsLoading, 
        error: conversationsError, 
    } = useQuery(QUERY_CONVERSATIONS, { variables: {user: user.email}});

    return (
      <div style={{
        background: '#D9D9D9',
              width: '20em',
      }}>
        {conversations.map(conversation => (
          <div onClick={() => onSelectConversation(conversation)}>
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
    );
};

export default Sidebar;
