import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../State/Auth/Action'; // Create this action

const ForgotPassword = ({ onBackToLogin }) => {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");

    dispatch(forgotPassword({ email })); // you'll handle this in redux
    setEmailSent(true);
  };

  return (
    <div>
      <div className='flex justify-center flex-col'>
        <p className='text-2xl font-bold py-4 mb-2'>Forgot Password</p>
      </div>
      {emailSent ? (
        <p className='text-green-600'>A reset link has been sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                required 
                id="email"
                name='email'
                label="Email"
                fullWidth
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                className='text-white w-full'
                type='submit' 
                variant='content' 
                size='large' 
                sx={{padding:'.8rem 0', bgcolor:"#9155FD", color:"white"}}
              >
                Send Reset Link
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={onBackToLogin} size="small">
                Back to Login
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
