import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useStore } from '../store/todoContext'


export function AddTodo(props) {
    const store = useStore()
    const { todoStore } = store
    const { actionStore } = store
    const [todoText, setTodoText] = useState('')

    async function onSubmit(ev) {
        ev.preventDefault()
        if (!todoText.trim()) return
        await todoStore.addTodo(todoText)
        actionStore.addAction(`Added ${todoText}`)
        setTodoText('')
    }

    return (
        <div className="add-todo-container">
            <form onSubmit={onSubmit}>
                <TextField type="text" label="Add new task" value={todoText} onChange={(ev) => setTodoText(ev.target.value)} />
                <Button color="primary" onClick={onSubmit}>Add Task</Button>
            </form>
        </div>
    )
}
