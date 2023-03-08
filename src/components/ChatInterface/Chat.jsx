import React, { useEffect, useState, useRef } from "react";
import userImg from "../../img/user.png";
import sendButtonImg from "../../img/send_icon.png";
import { useMutation, useQuery, gql } from "@apollo/client";

const QUERY_MESSAGES = gql`
  query Messages($conversation_id: Int!) {
    messages(conversation_id: $conversation_id) {
      msg_id
      msg_text
      msg_time
      sender {
        name
        email
      }
      conversation {
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

const SEND_MESSAGE = gql`
  mutation CreateMessage(
    $msg_text: String!
    $sender: String!
    $conversation: Int!
  ) {
    createMessage(
      msg_text: $msg_text
      sender: $sender
      conversation: $conversation
    ) {
      sender {
        email
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
const MESSAGE_SUBSCRIPTION = gql`
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

const Message = ({ message, sentBySelf }) => {
  const baseStyle = {
    listStyleType: "none",
    maxWidth: "80%",
    margin: "0.5em 2em",
    borderRadius: "1em",
    padding: "1em",
    boxShadow: "0 4px 4px #00000040",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
  };

  const otherStyle = {
    ...baseStyle,
    background: "white",
  };
  const selfStyle = {
    ...baseStyle,
    background: "#537fb7",
    alignSelf: "flex-end",
  };

  const date = new Date(message.msg_time);
  const now = new Date();

  let msg_time = "";

  if (now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
    msg_time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    msg_time = date.toLocaleString("en-US", {
      year: undefined,
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <div style={sentBySelf ? selfStyle : otherStyle}>
      <p style={{ margin: 0 }}>{message.msg_text}</p>
      <span
        style={{
          fontSize: "0.5em",
          alignSelf: "flex-end",
        }}
      >
        {msg_time}
      </span>
    </div>
  );
};

const Input = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.length > 0) sendMessage(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0.5em",
      }}
    >
      <input
        type="text"
        placeholder="Type..."
        onKeyPress={(e) => (e.key === "Enter" ? handleSend() : undefined)}
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          flexGrow: 1,
          border: "0.5px solid black",
          background: "#f5f5f5",
          borderRadius: "2em",
          padding: "0 1em",
        }}
      />
      <img
        alt="send-button"
        src={sendButtonImg}
        style={{
          height: "2em",
          width: "2em",
          margin: "0em 1em",
        }}
        onClick={handleSend}
      />
    </div>
  );
};

const Chat = ({ conversation, user }) => {
  const {
    data: { messages } = { messages: [] },
    refetch,
    subscribeToMore,
  } = useQuery(QUERY_MESSAGES, {
    variables: { conversation_id: conversation?.conversation_id },
  });

  useEffect(
    () =>
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        updateQuery: (prev, current) => {
          console.log("arrived via subscription", current);
          if (current?.subscriptionData?.data?.message)
            return {
              messages: [
                ...((prev && prev.messages) || []),
                current.subscriptionData.data.message,
              ],
            };
          return prev;
        },
      }),
    []
  );

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const sendMessage = async (msg_text) => {
    await sendMessageMutation({
      variables: {
        msg_text,
        sender: user.email,
        conversation: conversation.conversation_id,
      },
      optimisticResponse: {
        createMessage: {
          sender: {
            email: user.email,
          },
          conversation: {
            conversation_id: conversation.conversation_id,
          },
          msg_time: new Date().toLocaleString(),
          msg_text: "optimistic " + msg_text,
          msg_id: -1,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            messages: (existingMessages) => [
              ...existingMessages,
              data.createMessage,
            ],
            conversations: (existingConversations) => {
              return [
                {
                  ...conversation,
                  last_msg: data.createMessage,
                },
                ...existingConversations.filter(
                  (i) => i.conversation_id !== conversation.conversation_id
                ),
              ];
            },
          },
        });
        console.log(cache);
      },
    });
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        fontSize: "1.5em",
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      {conversation === null ? (
        <h1 style={{ alignSelf: "center" }}>Select a conversation</h1>
      ) : (
        <>
          <div
            style={{
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1em",
              color: "black",
            }}
          >
            <img alt="profile-pic" src={userImg} className="contact-photo" />
            <span>
              {conversation.person_a.email === user.email
                ? conversation.person_b.name
                : conversation.person_a.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 2,
              overflowY: "scroll",
            }}
          >
            {messages.map((m) => (
              <Message
                message={m}
                key={m.msg_id}
                sentBySelf={m.sender.email === user.email}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <Input sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
};

export default Chat;
