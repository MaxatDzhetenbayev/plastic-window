import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const BaseLayout = () => {
  return (
    <Container>
        <Outlet/>
    </Container>
  )
}
