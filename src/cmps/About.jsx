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
                    <h3>Tasky was built by <a href="https://yaronl219.github.io/portfolio/">Yaron Lipshitz</a></h3>
                    <p>This simple CRUD app was built in order to practice working primarily with MobX, and to work with React beautiful DnD</p>
                    <h4>Tools used in this mini-project</h4>
                    <ul>
                        <li>React</li>
                        <li>MobX</li>
                        <li>Material UI</li>
                        <li>React beautiful DnD</li>
                        <li>Node.js</li>
                        <li>MongoDB</li>
                        <li>Python (for scraping the random todos)</li>
                    </ul>
                    <p>The random task generator was built with tasks from <a href="https://fullylived.com/bucket-list-ideas/">Fully Lived</a>.</p>
                    <p>Check out his website if you're interested in this sort of thing.</p>
                    <h4>Did you like this project?</h4>
                    <p>Then take a look at my <a href="https://yaronl219.github.io/portfolio/">portfolio</a></p>
                </div>
            </div>
        </Paper>
    )
}
