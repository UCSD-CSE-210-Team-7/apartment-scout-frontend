import React from "react";
import { Grid, Typography, Rating } from "@mui/material";
import "../styles/scout-card-styles.scss";

function ScoutCard(props) {
  const user = props.user;
  return (
    <div style={{
            background:'#D9D9D9', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '1em 2em',
            width: '30em',
            margin: '3em',
            borderRadius: '1em',
            boxShadow: '0.5em 0.5em 2em -1em black',
    }}>
        <div style={{
                width: '90%',
                textAlign: 'center',
                padding: '1em',
                background: '#FFFFFF',
                borderRadius: '1em',
                boxShadow: '0.5em 0.5em 2em -1em black',
                margin: '1em 0',
        }}>
            <img src={props.userImage} alt="userImage" className="user-avatar" />
        </div>
        <div style={{
                width: '90%',
                textAlign: 'center',
                padding: '0.5em',
                background: '#FFFFFF',
                borderRadius: '1em',
                // boxShadow: '0.5em 0.5em 2em -1em black',
                margin: '1em 0',
        }}>
            <Rating
                name="user-rating"
                value={user.rating}
                precision={0.1}
                readOnly
                style={{
                    fontSize: '3em',
                        display: 'flex',
                        justifyContent: 'center',
                }}
                />
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1,
        }}>
            <h1>
                {user.name}
            </h1>
        </div>
    </div>
  );
}

export default ScoutCard;
