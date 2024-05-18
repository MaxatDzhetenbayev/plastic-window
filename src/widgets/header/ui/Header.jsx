import { AppBar, Container, Toolbar } from '@mui/material'
import React from 'react'
import { Logo } from '@components/'
import { Navbar } from '@entities/'
import { ProfileCard } from '@widgets/profile-card'

export const Header = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Container sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Logo/>
                <Navbar/>
                <ProfileCard/>
            </Container>
        </Toolbar>
    </AppBar>
  )
}
