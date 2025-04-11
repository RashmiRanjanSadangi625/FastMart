import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Achievement = () => {
  return (
    <Card className='flex space-y-5' sx={{position:"relative", justifyContent:"space-between",bgcolor:"#242B2E",color:"white"}}>
        <CardContent>
            <Typography variant='h6' sx={{letterSpacing:"0.25px",}}>FastMart Dash</Typography>
            <Typography  sx={{letterSpacing:"0.25px",}}>Congartulations !</Typography>
            <Typography  variant='h6' sx={{letterSpacing:"0.25px",paddingBottom:"5px",my:2}}>100.8K</Typography>
            <Button size='small' variant='content' sx={{bgcolor:"blue",color:"#fff"}}>View Sales</Button>
        </CardContent>
        <CardContent >
            <EmojiEventsIcon  sx={{fontSize:"150px",color:"blue"}}/>  
        </CardContent>
    </Card>
  )
}

export default Achievement