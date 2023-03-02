import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import userImg from "../img/user.png";
import "../styles/profile-styles.scss";
import users from "../dummy_data/users.json";

function Badge({name, state='false', color='green'}){
    return (
        <div style={{
            padding: '0.4em 0em',
            width: '10em',
            background: state ? color : 'grey',
            border: 'none',
            margin: '2em 0 0',
            color: 'white',
            fontSize: '2em',
            textAlign: 'center',
        }}>
            {name}
        </div>
    )
}

function Field({name, value, handleChange, disabled}){
    return (
        <div style={{ padding: '1em' }}>
            <p style={{margin: 0}}>{name}</p>
            <input disabled={disabled} type="text" value={value} onChange={handleChange} style={{
                
            }}/>
        </div>
    )
}

const Profile = () => {
    const [editMode, setEditMode] = useState(false);

    const fileInput = React.createRef()

    const [user, setUser] = useState(users.data.users[0])

    function handleEditButtonClick() {
        setEditMode(!editMode);
    }

    const handleNameChange = e => {
        setUser({...user, name: e.target.value})
    };

    /*
    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };
    */

    return (
        <div style={{
            display: 'flex'
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                    padding: '0 6em',
                    alignItems: 'center',
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    padding: '1em 3em',
                        color: '#023E8A',
                        background: '#ADE8F4',
                }}>
                    My Profile
                </h1>
                    <img src={user.image} alt="user" style={{
                        margin: '2em 0',
                        height: '20em',
                        width: '20em',
                        cursor: 'pointer',
                    }}/>
                <label>
                    <input type="file" style={{
                        display: 'none'
                    }} ref={fileInput} />
                    <h1 style={{
                        color: 'white',
                        cursor: 'pointer',
                    }}>
                        Edit profile photo
                    </h1>
                </label>
                <Badge name="Requester" state={user.is_requester} color='purple'/>
                <Badge name="Scout" state={user.is_scout} color='green'/>
            </div>

            <div style={{
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                    padding: '2em',
                    background: 'white',
                    fontSize: '2em',
            }}>
                <h1>Personal Info</h1>
                <Field name="name" value={user.name} onChange={handleNameChange}></Field>
                <Field disabled name="email" value={user.email}></Field>
                <Field name="zipcodes" value={user.regions}></Field>
            </div>

        </div>
    )
};

export default Profile;
