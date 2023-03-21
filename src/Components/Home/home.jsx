
import logo from "./flower.jpg";
import pic from "./Goldie.jpg";
//import "./App.css";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import"./home.css";

export const Home = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Typography align="left" variant="h1" color="grey">
        Goldie Max
      </Typography>
      <Typography variant="h3" color="#bd7394" marginTop="2em" marginBottom="2em" >
        Goldie Max lives in Cherry, NJ and is currently studying Computer
        Science at Touro College. She is getting married to Elchanan Ornstein on
        February 19.
        
      </Typography>
      <img src={pic} className="picture" width="50%"/>
      

      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item><Button variant="contained" href="https://reactjs.org">
        Click me to see what Goldie is learning in college
      </Button>{" "}
      {/* new */}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item> <Button 
        variant="contained"
        href="https://www.amazon.com/wedding/goldie-max-elchanan-ornstein--february-2023/registry/1862HBSAGP85L"
      >
        Click me to see Goldie and Elchanan's wedding registry
      </Button>{" "}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><Button 
        variant="contained"
        href="https://las.touro.edu/"l9
      >
        Click me to find out more about Touro College
      </Button>{" "}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><Button 
        variant="contained"
        href="https://www.google.com/maps/dir//tiferes+mordechai+wedding/@40.2961795,-75.0588863,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c25b2bb9c9eb91:0x669ebaceb15e9e46!2m2!1d-73.9792241!2d40.6394334"
      >
        Click me to get directions to Goldie and Elchanan's wedding
      </Button>{" "}</Item>
        </Grid>
      </Grid>
    </Box>
    


      
     
    </div>
  );
}