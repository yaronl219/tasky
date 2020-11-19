import { AppBar, Button, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import HistoryIcon from '@material-ui/icons/History';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStore } from '../store/todoContext';
import FaceIcon from '@material-ui/icons/Face';
import { useObserver } from 'mobx-react';

export function Navbar(props) {

    const store = useStore()
    const { userStore,todoStore,actionStore } = store

    async function onClickLogin() {
        if (!userStore.isLoggedIn) return props.toggleLogin()
        await userStore.logout()
        await todoStore.getTodos()
        await actionStore.getActions()
        return
    }

    return useObserver(() => (
        <AppBar className="navbar">
            <h2>Tasky</h2>
            <Button onClick={props.toggleAbout}>About</Button>
            <Tooltip title={(userStore.isLoggedIn) ? 'Logout' : 'Login / Signup'}>
                <IconButton onClick={onClickLogin}>
                    {(!userStore.isLoggedIn) ? <AccountCircleIcon /> : <FaceIcon />}
                </IconButton>
            </Tooltip>
            <IconButton onClick={props.toggleDrawer}>
                <HistoryIcon style={{ color: 'white' }} />
            </IconButton>
        </AppBar>
    )
    )
}
