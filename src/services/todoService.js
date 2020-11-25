import { actionService } from "./actionService"
import { httpService } from "./httpService"
import { userService } from "./userService"
import { utilService } from "./utils-service"

export const todoService = {
    addTodo,
    getTodos,
    toggleIsDone,
    removeTodo,
    changeOrder,
    renameTodo,
    getRandomTasks,
    addMultipleTodos
}

async function getRandomTasks(amount) {
    const todos = await httpService.get(`todos/random?amount=${amount}`)
    return todos
}

async function addMultipleTodos(todos) {
    const newTodos = todos.map(todo => {
        return {
            title: todo.text,
            id: utilService.makeId(8),
            completedAt: null
        }
    })

    const { userId, userTodos } = await _loadTodos()
    userTodos.todos = userTodos.todos.concat(newTodos)

    await actionService.addAction(`Added random tasks`,userTodos,userId)
    return
}

async function addTodo(todo) {
    const { userId, userTodos } = await _loadTodos()
    userTodos.todos.push(todo)
    // await httpService.put(`todos/${userId}`, userTodos)
    await actionService.addAction(`Added ${todo.title}`,userTodos,userId)
    return todo
}

async function getTodos() {
    const { userTodos } = await _loadTodos()
    return userTodos.todos
}

async function toggleIsDone(id) {
    const { userId, userTodos } = await _loadTodos()
    const updatedTodo = userTodos.todos.find(todo => todo.id === id)
    if (updatedTodo.completedAt) {
        updatedTodo.completedAt = null
    } else {
        updatedTodo.completedAt = Date.now()
    }
    userTodos.todos.map(todo => {
        if (todo.id === id) return updatedTodo
        return todo
    })
    await actionService.addAction(`Marked ${updatedTodo.title} as ${(updatedTodo.completedAt) ? 'completed' : 'uncompleted'}`,userTodos,userId)
    // await httpService.put(`todos/${userId}`, userTodos)
    return userTodos.todos
}

async function removeTodo(id,title) {
    const { userId, userTodos } = await _loadTodos()
    
    userTodos.todos = userTodos.todos.filter(todo => todo.id !== id)
    // await httpService.put(`todos/${userId}`, userTodos)
    await actionService.addAction(`Removed ${title}`,userTodos,userId)
    return userTodos.todos
}

async function changeOrder(oldIdx, newIdx) {
    const { userId, userTodos } = await _loadTodos()
    const removedTodo = userTodos.todos.splice(oldIdx, 1)
    userTodos.todos.splice(newIdx, 0, removedTodo[0])
    
    await actionService.addAction(`Changed the location of ${removedTodo[0].title}`,userTodos,userId)
    // httpService.put(`todos/${userId}`, userTodos)
    return userTodos.todos

}

async function renameTodo(updatedTodo,oldTitle) {
    const { userId, userTodos } = await _loadTodos()
    userTodos.todos = userTodos.todos.map(todo => {
        if (todo.id === updatedTodo.id) return updatedTodo
        return todo
    })
    await actionService.addAction(`Renamed ${oldTitle} to ${updatedTodo.title}`,userTodos,userId)
    return userTodos.todos
}

async function _loadTodos() {
    const userId = await userService.getUser()
    const userTodos = await httpService.get(`todos/${userId}`)
    return { userTodos, userId }
}



