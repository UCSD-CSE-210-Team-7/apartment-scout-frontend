import Chat from "../components/ChatInterface/Chat";
import Sidebar from "../components/ChatInterface/Sidebar";
import "../styles/chat-styles.scss";
import { useMutation, useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Define GraphQL queries for conversations and the last message for the conversation
export const QUERY_CONVERSATIONS = gql`
  query Conversations {
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
        messages {
          msg_id
          msg_text
          msg_time
          sender {
            name
            email
          }
        }
      }
    }
  }
`;

// Define GraphQL mutations for sending message to the conversation
export const SEND_MESSAGE = gql`
  mutation CreateMessage($msg_text: String!, $conversation: Int!) {
    createMessage(msg_text: $msg_text, conversation: $conversation) {
      sender {
        email
        name
      }
      conversation {
        conversation_id
      }
      msg_text
      msg_time
      msg_id
    }
  }
`;

// Define GraphQL subscription for receiving new messages
export const MESSAGE_SUBSCRIPTION = gql`
  subscription Message {
    message {
      msg_id
      msg_text
      msg_time
      sender {
        name
        email
      }
      conversation {
        conversation_id
        person_a {
          email
          name
        }
        person_b {
          email
          name
        }
      }
    }
  }
`;

/**
 * ChatPage component that displays a list of previous conversations, allows to see
 * previous messages and send message to each of the conversation
 * @returns {JSX.Element} The JSX element for the ChatPage component.
 */
const ChatPage = () => {
  const conversation_id = parseInt(useParams().conversation_id) ?? 0;

  const [selectedConversation, setSelectedConversation] =
    useState(conversation_id);

  // Fetch the conversation details and set up subscription to fetch latest messages
  let {
    data: conversationData,
    subscribeToMore,
    refetch: refetchConversations,
  } = useQuery(QUERY_CONVERSATIONS);

  useEffect(
    () =>
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        updateQuery: (prev, current) => {
          if (
            current?.subscriptionData?.data?.message &&
            Object.keys(current?.subscriptionData?.data?.message).length
          ) {
            const updatedConversation = prev.me.conversations.find(
              (i) =>
                i.conversation_id ===
                current.subscriptionData.data.message.conversation
                  .conversation_id
            );
            // Update the conversation by adding the new message
            const withMessage = {
              ...updatedConversation,
              messages: [
                ...updatedConversation.messages,
                current.subscriptionData.data.message,
              ],
            };
            return {
              me: {
                ...prev.me,
                conversations: [
                  ...prev.me.conversations.filter(
                    (i) =>
                      i.conversation_id !==
                      current.subscriptionData.data.message.conversation
                        .conversation_id
                  ),
                  withMessage,
                ],
              },
            };
          }
          return undefined;
        },
      }),
    [subscribeToMore]
  );

  // Use mutation to send message
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  // Event handler to send the message on click of send button and refetch the conversation
  const sendMessage = async (msg_text) => {
    await sendMessageMutation({
      variables: {
        msg_text,
        conversation: selectedConversation,
      },
    });
    await Promise.all([refetchConversations()]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        maxHeight: "90vh",
      }}
    >
      <Sidebar
        conversations={conversationData?.me?.conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />
      <Chat
        conversation={conversationData?.me?.conversations.find(
          (i) => i.conversation_id === selectedConversation
        )}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatPage;
