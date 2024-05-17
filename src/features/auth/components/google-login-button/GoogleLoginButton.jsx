import { Button, IconButton } from '@mui/material'
import { sign } from 'crypto'
import React from 'react'
import { signInWithGoogle } from '../../api/auth'

export const GoogleLoginButton = () => {

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    }

  return (
    <IconButton onClick={handleGoogleLogin}>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google-logo" />
    </IconButton>
  )
}
