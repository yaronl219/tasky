import { useObserver } from 'mobx-react';
import React, { useState } from 'react'
import { utilService } from '../services/utils-service';
import { useStore } from '../store/todoContext';
import { Draggable } from 'react-beautiful-dnd'
import { Checkbox, IconButton, Input, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Todo({ idx, todo, canDrag }) {

    const store = useStore()
    const { todoStore, actionStore } = store

    const [isEditing, setEditing] = useState(false)
    const [todoText, setTodoText] = useState('')

    async function toggleIsDone() {
        await todoStore.toggleIsDone(todo.id)
        await actionStore.addAction(`Marked ${todo.title} as ${(todo.completedAt) ? 'completed' : 'uncompleted'}`)
    }

    async function removeTodo() {
        await todoStore.removeTodo(todo.id, todo.title)
        actionStore.addAction(`Removed ${todo.title}`)
    }

    function onSetEditing() {
        setTodoText(todo.title)
        setEditing(true)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const oldTodoTitle = todo.title
        if (oldTodoTitle !== todoText) {
            await todoStore.renameTodo(todoText, todo.id)
        }
        setEditing(false)
        actionStore.addAction(`Renamed ${oldTodoTitle} to ${todoText}`)
    }

    return useObserver(() => (

        <Draggable isDragDisabled={canDrag} draggableId={todo.id} index={idx}>
            {(provided) => (
                <Paper  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="todo-container">
                        <Checkbox color="primary" checked={!!todo.completedAt} onChange={toggleIsDone} />
                        <div onClick={onSetEditing} className="todo-text-container">
                            {(isEditing) ? (
                                <form onSubmit={onSubmit} onBlur={onSubmit}>
                                    <Input value={todoText} autoFocus onChange={(ev) => setTodoText(ev.target.value)} />
                                </form>) : (<div>
                                    <div style={{ cursor: (!canDrag) ? '' : 'default' }} className={(todo.completedAt) ? 'todo-done' : 'todo-undone'}>{todo.title}</div>
                                    <div style={{opacity: (todo.completedAt) ? '100' : '0'}}><small>Completed on {utilService.parseTimestamp(todo.completedAt)}</small></div>
                                </div>
                                )
                            }

                        </div>
                        <IconButton onClick={removeTodo}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Paper>

            )}
        </Draggable>
    )
    )
}
