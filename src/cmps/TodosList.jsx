import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useStore } from '../store/todoContext';
import Todo from './Todo';
import { Droppable } from 'react-beautiful-dnd'
import { LinearProgress } from '@material-ui/core'
import { Filters } from './Filters';
import { EmptyState } from './EmptyState';
import { RandomTasks } from './RandomTasks';


export function TodosList(props) {
    const store = useStore()
    const { todoStore } = store


    const [nameFilter, setNameFilter] = useState('')
    const [filterDone, setFilterDone] = useState('none')
    const [isFiltered, setIsFiltered] = useState(false)

    useEffect(() => {
        if (!nameFilter && filterDone === 'none') {
            setIsFiltered(false)
        } else {
            setIsFiltered(true)
        }
    }, [nameFilter, filterDone])

    const donePercentage = (todoStore.doneTodosCount / todoStore.totalTodosCount) * 100

    const filteredTodos = () => {
        const filteredTodos = todoStore.todos.filter(todo => todo.title.toLowerCase().includes(nameFilter.toLowerCase()))
        if (filterDone === 'done') return filteredTodos.filter(todo => todo.completedAt)
        if (filterDone === 'undone') return filteredTodos.filter(todo => !todo.completedAt)
        return filteredTodos
    }

    return useObserver(() => (
        <div>
            <Filters isFiltered={isFiltered} onFilterDone={setFilterDone} onSetNameFilter={setNameFilter} />
            {(!filteredTodos().length) ? <EmptyState isFiltered={isFiltered} /> : (
                <div className="list-container">
                    <div className="progress-container">
                        <LinearProgress variant="determinate" value={donePercentage} />
                    </div>
                    <Droppable droppableId="list">
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {filteredTodos().map((todo, idx) => <Todo key={todo.id} canDrag={isFiltered} idx={idx} todo={todo} />)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </div>
    )
    )
}
