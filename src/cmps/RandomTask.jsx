import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Skeleton } from '@material-ui/lab';

export function RandomTask({todo, lockedIds, onToggleLock, isLoading}) {
    
    function isLocked() {
        return (lockedIds.includes(todo._id))
    }
    
    function getLockImage() {
        return isLocked() ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />
    }
    
    return (
        <div className="random-task-container">

            {(!isLocked() && isLoading) ? <Skeleton variant="rect" width={272} height={28} /> : 
            <React.Fragment><div className="lock-container" onClick={() => onToggleLock(todo._id)}>
                {getLockImage()}
            </div>
            <div className="todo-title">
                {todo.text}
            </div>
            </React.Fragment>}
        </div>
    )
}
