import { Button, Divider, IconButton, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from '../store/todoContext';

export function Login({ toggleLogin }) {

    const store = useStore()
    const { userStore, todoStore, actionStore } = store

    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [failedLogin, setFailedLogin] = useState(false)

    async function onHandleSubmit() {
        if (!username || !password) return
        if (isLogin) {
            const res = await userStore.login(username, password)
            if (!res) return setFailedLogin(true)
        } else {
            await userStore.signup(username, password)
        }
        await todoStore.getTodos()
        await actionStore.getActions()
        toggleLogin()
    }

    
    return (
        <Paper >
            <div className="login-container">
                <div className="login-header">
                    <h2>{(isLogin) ? 'Login' : 'Signup'}</h2>
                    <div className="close-container">
                        <IconButton onClick={toggleLogin}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
                <Divider />
                <form onSubmit={onHandleSubmit}>
                    <TextField label="Username" required value={username} onChange={(ev) => setUsername(ev.target.value)} />
                    <TextField label="Password" required type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                    {(failedLogin) ? <small>Username or password incorrect</small> : <React.Fragment />}
                    <Button onClick={onHandleSubmit}>{(isLogin) ? 'Login' : 'Signup'}</Button>
                </form>
                <div className="switch-signup-login">
                    <p onClick={() => setIsLogin(!isLogin)}>{(!isLogin) ? 'Already signed up? click here to login' : 'Haven\'t signed up yet? click here to signup'}</p>
                </div>
            </div>

        </Paper>
    )
}
