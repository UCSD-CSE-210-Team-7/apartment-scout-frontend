import React, { useState, useEffect, useContext } from "react";
import { Grid, Button, TextField } from "@mui/material";
import scoutData from "./scouts.json";
import userImage from "../img/user.png";
import "../styles/display-scout-styles.scss";
import ScoutCard from "./ScoutCard";
import { useLazyQuery, gql } from "@apollo/client";

const QUERY_USER_BY_REGIONS = gql`
  query UsersByRegion($zipcode: Int) {
    usersByRegion(zipcode: $zipcode) {
      users {
        name
      }
    }
  }
`;

function InputBar({submit}){
    const [zipcode, setZipcode] = useState('');
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em 6em 0'}}>
          <h1 style={{fontSize: '3.5em', color: '#FFFFFF'}}>Find a Scout</h1>
          <div style={{
            display: 'flex',
                  alignItems: 'center',
          }}>
            <input style={{
                fontSize: '2em', 
                    textAlign: 'center', 
                    height: '2em', 
                    background: '#D9D9D9', 
                    border: '0', 
                    borderRadius: '2em', 
                    width: '8em',
            }} type="text" placeholder="(zipcode)" value={zipcode} onChange={e => setZipcode(e.target.value)}/>
            <button style={{
                fontSize: '2em', 
                    textAlign: 'center', 
                    height: '2em', 
                    background: '#ADE8F4', 
                    border: '0', 
                    borderRadius: '2em', 
                    padding: '0 1em',
                    margin: '0 0 0 1em',
            }} onClick={() => submit(parseInt(zipcode))}>
              Go
            </button>
          </div>
        </div>
    )
}

function DisplayScouts() {
    const [users, setUsers] = useState([]);

    const [zipcode, setZipcode] = useState("");

    const [ getUsersByRegion, { data, loading, error, refetch } ] = useLazyQuery(QUERY_USER_BY_REGIONS);

    console.log(data, loading, error, refetch)

    useEffect(() => {}, []);

    const HandleZipCodeSearch = () => {
        // Fire the usersByRegion API
        refetch({ variables: { zipcode: zipcode } }); // pass the value as a variable to the query
    };

    /*
    useEffect(() => {
        // Fetch data from an API or database
        setUsers([...scoutData]);
    }, []);
     */

    return (
      <div>
        <InputBar submit={zipcode => getUsersByRegion({ variables: { zipcode}}) }/>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', 
                padding: '1em 7em',
        }}>
            {
                data && 
                data.usersByRegion && 
                data.usersByRegion.users &&
                data.usersByRegion.users.map((user) => (
                  <ScoutCard key={user.name} user={user} userImage={userImage}></ScoutCard>
                ))
            }
        </div>
      </div>
    );
// >>>>>>> redesign pages
}

export default DisplayScouts;
