import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store)

  useEffect(()=>
  {
    if(jwt){dispatch(getUser(jwt))}

  },[jwt,auth.jwt])
 
  const handleSubmit=(e)=>{
    e.preventDefault();
   
    const data= new FormData(e.currentTarget);
    const userData={
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      email:data.get("email"),
      password:data.get("password"),
    }
    
    dispatch(register(userData));
    // console.log(userData);
    
   
  }

  return (
    <div>
      <div className='flex  justify-center flex-col '>
        <div className='flex'>
          <p className='text-2xl font-bold py-4 mb-2'>Register</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
            required 
            id="firstName"
            name='firstName'
            label="First Name"
            fullWidth
            autoComplete='given-name'
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            required 
            id="lastName"
            name='lastName'
            label="Last Name"
            fullWidth
            autoComplete='given-name'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            required 
            id="email"
            name='email'
            label="Email"
            fullWidth
            autoComplete='email'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            required 
            id="password"
            name='password'
            label="Password"
            fullWidth
            autoComplete='password'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button className='text-white w-full' 
            type='submit' 
            variant='content' 
            size='large' 
            sx={{padding:'.8rem 0',bgcolor:"#9155FD",color:"white"}}
            >Register</Button>
          </Grid>
        </Grid>
      </form>
      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you have already account ?</p>
          <Button onClick={()=>navigate('/login')} className="ml-5" size='small'>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm