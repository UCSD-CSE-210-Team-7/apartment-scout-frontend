import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import scoutData from "./scouts.json";
import userImage from "./user.jpg";

// export const  DisplayScouts = () => {
//     const [scouts, setScouts] = useState([]);

//     useEffect(() => {
//         setScouts(scoutData);
//         console.log(scoutData);
//     }, []);

//     return (
//         <div>
//             <h1>Scouts</h1>
//             {scouts.map((scout) => {
//                 return (<li key={scout.id}>
//                     <img src={user} width="150" height="150" alt="userimage"/>
//                     <h2>{scout.name}</h2>
//                 </li>)
//             })}
//         </div>
//     )
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 120,
    height: 120
  },
}));

function DisplayScouts() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from an API or database
    setUsers(scoutData);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                    src={userImage}
                  >
                    {/* {user.name.substring(0, 1)} */}
                  </Avatar>
                }
                title={user.name}
                subheader={
                    <Rating
                      name="user-rating"
                      value={user.rating}
                      precision={0.1}
                      readOnly
                    />
                  }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Phone: {user.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DisplayScouts;
