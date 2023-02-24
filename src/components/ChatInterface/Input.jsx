import React, { useState } from "react";

const Input = () => {
  const [text, setText] = useState("");

  return (
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send-button">
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
