import React from "react";
import styles from '../styles/loading-styles.module.css';

function Loading(){
  return (
    <div style={{
      flexGrow: '1',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    }}>
      <span title="loading" className={styles.loader}></span>
    </div>
  )
}

export default Loading;
