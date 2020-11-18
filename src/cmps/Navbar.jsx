import { AppBar, Button, IconButton } from '@material-ui/core'
import React from 'react'
import HistoryIcon from '@material-ui/icons/History';

export function Navbar(props) {
    return (
        <AppBar className="navbar">
            <h2>Tasky</h2>
            <Button onClick={props.toggleAbout}>About</Button>
            <IconButton onClick={props.toggleDrawer}>
                <HistoryIcon style={{color:'white'}}/>
            </IconButton>
        </AppBar>
    )
}
