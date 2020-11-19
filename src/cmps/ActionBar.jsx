import { Divider, Drawer, ListItem, ListItemText } from '@material-ui/core'
import { useObserver } from 'mobx-react'
import React from 'react'
import { utilService } from '../services/utils-service'
import { useStore } from '../store/todoContext'

export function ActionBar({ isOpen }) {
    const store = useStore()
    const { actionStore } = store

    return useObserver(() => (
        <Drawer open={isOpen} variant="persistent" anchor="right">
            <div className="action-bar">
                <h3>History</h3>
                <Divider />
                {(actionStore.actions.length) ? (

                    <ul>
                        {actionStore.actions.map((action, idx) =>
                            <React.Fragment key={idx}>
                                <ListItem >
                                    <div className="action-container">
                                        <ListItemText primary={action.title} secondary={utilService.parseTimestamp(action.date)} />
                                    </div>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )}
                    </ul>
                ) : <div className="empty-state">
                    <h3>Looks like you still havent done anything!</h3>
                    <p>Start moving things around... this will be populated</p>
                    </div>}
            </div>
        </Drawer>
    )
    )
}
