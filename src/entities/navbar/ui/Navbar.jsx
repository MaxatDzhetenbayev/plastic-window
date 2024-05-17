import React, { useState } from 'react'
import {List, ListItem, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'


const navList = [
    {
        to: '/',
        title: 'Главная'
    },
    {
        title: 'Окна',
        children: [
            {
                to: '/windows/plastic',
                title: 'Пластиковые окна'
            },
            {
                to: '/windows/wooden',
                title: 'Деревянные окна'
            },
            {
                to: '/windows/aluminum',
                title: 'Алюминиевые окна'
            }
        ]
    }
]

const renderNavList = (list) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentParent, setCurrentParent] = useState(null);
    const open = Boolean(anchorEl);

    const handleMouseEnter = (event, title) => {
        setAnchorEl(event.currentTarget);
        setCurrentParent(title);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setCurrentParent(null);
    };

    return list.map(({ to, title, children }) => {
        const isParent = children && children.length > 0;
        return (
            <div key={title} onMouseLeave={isParent ? handleMouseLeave : null}>
                <ListItem onMouseEnter={isParent ? (event) => handleMouseEnter(event, title) : null}>
                    <Link to={!isParent ? to : '#'}>{title}</Link>
                </ListItem>
                {isParent && currentParent === title && (
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMouseLeave}
                        MenuListProps={{
                            onMouseLeave: handleMouseLeave
                        }}
                    >
                        {children.map(({ to, title }) => (
                            <MenuItem key={title} component={Link} to={to} onClick={handleMouseLeave}>
                                {title}
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </div>
        );
    });
};

export const Navbar = () => {
    return (
        <List sx={{ display: "flex" }}>
            {renderNavList(navList)}
        </List>
    )
}
