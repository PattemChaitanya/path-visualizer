import { Grid, Typography } from '@mui/material';
import './Header.css'
import React from 'react'

const Header = () => {
    const nodes = [
        { name: 'Start Node', value: "start" },
        { name: 'Finish Node', value: "finish" },
        { name: 'Wall Node', value: "wall" },
        { name: 'Shortest Path', value: "shortest" },
        { name: 'Visited Node', value: "visited" },
    ];
  return (
    <>
        <Grid container justifyContent="center" alignItems="center" sx={{ margin: "20px"}}>
            {nodes.map((node, nodeIdx) => {
                return (
                    <Grid item alignItems="center" sx={{ margin: "0 10px"}} key={nodeIdx}>
                        <div className='header'>
                            <div className={`box ${node.value}`}></div>
                            <Typography variant="p" sx={{ textTransform: "uppercase" }}>
                                {node.name}
                            </Typography>
                        </div>
                    </Grid>
                )
            })}
        </Grid>  
    </>
      
  )
}

export default Header;
