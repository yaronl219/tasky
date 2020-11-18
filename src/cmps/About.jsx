import { Divider, IconButton, Paper } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

export function About({ toggleAbout }) {
    return (
        <Paper >
            <div className="about-container">
                <div className="about-header">
                    <h2>About</h2>
                    <IconButton onClick={toggleAbout}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className="about-main">
                    <h3>Tasky was built by Yaron Lipshitz</h3>
                    <p>This simple CRUD app was built in order to practice working primarily with MobX, and to work with React beautiful DnD</p>
                    <h4>Tools used in this mini-project</h4>
                    <ul>
                        <li>React</li>
                        <li>MobX</li>
                        <li>Material UI</li>
                        <li>React beautiful DnD</li>
                        <li>Node.js</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
            </div>
        </Paper>
    )
}
