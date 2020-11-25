import { Button, IconButton, Slider } from '@material-ui/core'
import React, { useState } from 'react'
import { todoService } from '../services/todoService'
import { useStore } from '../store/todoContext'
import { RandomTask } from './RandomTask'
import CloseIcon from '@material-ui/icons/Close';


export function RandomTasks({ onClose }) {

    const store = useStore()
    const { todoStore, actionStore } = store

    const [amount, setAmount] = useState(5)
    const [lockedIds, setLockedIds] = useState([])
    const [randomTodos, setRandomTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function onChangeSlider(newAmount) {
        if (amount !== newAmount) {
            setAmount(newAmount)
        }
    }

    function onToggleLock(id) {
        let locked
        if (lockedIds.includes(id)) {
            locked = lockedIds.filter(currId => currId !== id)
            console.log(locked)
        } else {
            locked = [...lockedIds]
            const todo = randomTodos.find(todo => todo._id === id)
            locked.push(todo._id)
        }
        setLockedIds(locked)
    }

    async function getRandomTodos() {
        if (amount - lockedIds <= 0 || amount > 10) return
        setIsLoading(true)
        const todos = lockedIds.map(id => randomTodos.find(todo => todo._id === id))
        const newTodos = await todoService.getRandomTasks(amount - lockedIds.length)
        newTodos.forEach(todo => {
            todos.push(todo)
        })
        setRandomTodos(todos)
        setIsLoading(false)
    }

    async function AddTasks() {
        await todoService.addMultipleTodos(randomTodos)
        await todoStore.getTodos()
        await actionStore.getActions()
        onClose()
    }


    return (
        <div className="random-tasks-container">
            <div className="random-tasks-header">
                <h2>Random Task Generator</h2>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>

            <p>Select the amount of tasks to generate</p>
            <Slider
                onChange={(ev, val) => onChangeSlider(val)}
                defaultValue={5}
                aria-labelledby="amount-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />

            <div className="random-tasks-list">
                {randomTodos.map(todo => <RandomTask key={todo._id}
                    todo={todo}
                    lockedIds={lockedIds}
                    onToggleLock={onToggleLock}
                    isLoading={isLoading} />)}
            </div>
            <div className="btn-container">
                <Button color="primary" onClick={getRandomTodos}>Get todos</Button>
                <Button color="primary" onClick={AddTasks}>Add Todos</Button>
            </div>
        </div>
    )
}
