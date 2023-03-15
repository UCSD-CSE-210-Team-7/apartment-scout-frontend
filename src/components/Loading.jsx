// Import required dependencies
import React from "react";
import styles from "../styles/loading-styles.module.css";

// The loading function is like a pause or laoding component when you hit go after entering the zipcode.
// and the time it takes for the next page to display.
function Loading() {
  return (
    <div
      style={{
        flexGrow: "1",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <span title="loading" className={styles.loader}></span>
    </div>
  );
}

export default Loading;
