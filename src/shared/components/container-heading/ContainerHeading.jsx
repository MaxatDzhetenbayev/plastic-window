import { Box, Typography } from '@mui/material'
import React from 'react'

export const ContainerHeading = ({title}) => {
    return (
        <Box sx={{ borderLeft: "5px solid #1976d2", paddingLeft: "10px" }}>
            <Typography variant="h4" content="h2" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
        </Box>
    )
}
