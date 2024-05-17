import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@widgets'
import { Box } from '@mui/material'

export const BaseLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  )
}
