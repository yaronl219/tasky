import { runInAction } from "mobx"
import { todoService } from "../services/todoService"
import { utilService } from "../services/utils-service"

export function createTodoStore() {
    return {
        todos: [],
        async getTodos() {
            const todos = await todoService.getTodos()
            runInAction(() => {
                this.todos = todos
            })
            return
        },
        async addTodo(title) {
            const todo = {
                title,
                id: utilService.makeId(8),
                completedAt: null
            }
            runInAction(() => {
                this.todos.push(todo)
            })
            await todoService.addTodo(todo)
            return
        },
        async removeTodo(id,title) {
            const todos = await todoService.removeTodo(id,title)
            runInAction(() => {
                this.todos = todos
            })
        },
        async toggleIsDone(id) {
            runInAction(() => {
                const todos = [...this.todos]
                const updatedTodo = todos.find(todo => todo.id === id)
                if (updatedTodo.completedAt) {
                    updatedTodo.completedAt = null
                } else {
                    updatedTodo.completedAt = Date.now()
                }
                todos.map(todo => {
                    if (todo.id === id) return updatedTodo
                    return todo
                })
                this.todos = [...todos]
            })
            todoService.toggleIsDone(id)
            return
        },
        async changeOrder(oldIdx, newIdx) {
            if (oldIdx === newIdx) return

            const todos = [...this.todos]
            const removedTodo = todos.splice(oldIdx, 1)
            todos.splice(newIdx, 0, removedTodo[0])
            runInAction(() => {
                this.todos = [...todos]
            })
            await todoService.changeOrder(oldIdx, newIdx)
            return removedTodo
        },
        async renameTodo(name,id) {
            let oldTodoTitle = ''
            const todo = this.todos.find(todo => todo.id === id)
            oldTodoTitle = todo.title
            runInAction(() => {
                todo.title = name
            })
            await todoService.renameTodo(todo,oldTodoTitle)

        },
        get totalTodosCount() {
            if (!this.todos || !this.todos.length) return 0
            return this.todos.length
        },
        get doneTodosCount() {
            if (!this.todos || !this.todos.length) return 0
            return this.todos.reduce((total,currTodo) => {
                if (currTodo.completedAt) total += 1
                return total
            },0)
        }
    }
}