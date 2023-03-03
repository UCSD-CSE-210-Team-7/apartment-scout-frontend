import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import "../../styles/home-styles.scss";
import { isNonEmptyArray } from '@apollo/client/utilities';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //boxShadow: 'none',
    // '.MuiOutlinedInput-notchedOutline': { border: 0 },
}));
function HomePageComponent({ pageType, tableColumns, tableData }) {

    function getFirstName(pageType, tableData){
        if (pageType == "scout"){
            const nameSplit = tableData[0].split(" ")
            return nameSplit[0]
        } else if (pageType == "requester"){
            const nameSplit = tableData[2].split(" ")
            return nameSplit[0]
        }
    } // TODO: tableData first element if pageType == "1" else tableData third element

    const firstName = getFirstName(pageType, tableData)
    return (
        <div className="overlay">
            <div className="inprogress-header">
                <h1 className="inprogress-text">In Progress Tours </h1>
            </div>
            {Array.from({ length: 2 }).map((_, idx) => (
                <Box key={idx} sx={{ margin: "0 auto", marginBottom: "30px", borderRadius: 5, bgcolor: 'white', width: 900, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container spacing={2}  >
                        {tableColumns.map((_, idx) => (
                            <Grid item xs={2} key={idx}  >
                                <Item sx={{ marginLeft: "10px", marginBottom: "5px", fontSize: "17px", fontWeight: "bold" }}> {tableColumns[idx]}</Item>
                                <Item sx={{ marginLeft: "10px" }}>{tableData[idx]}</Item>
                            </Grid>
                        ))}
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Button variant="contained">Chat with {firstName}</Button>
                        </Grid>
                    </Grid>
                </Box>

            ))}


            <div className="past-header">
                <h1 className="past-text">Past Tours </h1>
            </div>

            {Array.from({ length: 2 }).map((_, idx) => (
                <Box key={idx} sx={{ margin: "0 auto", marginBottom: "30px", borderRadius: 5, bgcolor: 'white', width: 900, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container spacing={2}  >
                        {tableColumns.map((_, idx) => (
                            <Grid item xs={2} key={idx}  >
                                <Item sx={{ marginLeft: "10px", marginBottom: "5px", fontSize: "17px", fontWeight: "bold" }}> {tableColumns[idx]}</Item>
                                <Item sx={{ marginLeft: "10px" }}>{tableData[idx]}</Item>
                            </Grid>
                        ))}
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Button variant="contained" color="success">View Receipt</Button>
                        </Grid>
                    </Grid>
                </Box>

            ))}

        </div>
    )
}

export default HomePageComponent