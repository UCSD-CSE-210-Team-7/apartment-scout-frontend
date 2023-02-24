import React, { useState, useEffect } from "react";
// import { makeStyles } from '@mui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Rating
} from "@mui/material"
import scoutData from "./scouts.json";
import userImage from "./user.jpg";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   card: {
//     maxWidth: 345,
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.main,
//     width: 120,
//     height: 120
//   },
// }));

function DisplayScouts() {
  // const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from an API or database
    setUsers(scoutData);
  }, []);

  return (
    <div className="root">
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4}>
            <Card className="card">
              <CardHeader
                avatar={
                  <Avatar
                    className="avatar"
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
