import { httpService } from "./httpService"
import { userService } from "./userService"



export const actionService = {
    getActions,
    addAction
}

async function addAction(actionTitle, userTodos, userId) {
    // const { userTodos, userId } = await _loadActions()
    const action = {
        title: actionTitle,
        date: Date.now()
    }
    userTodos.actions.unshift(action)
    await httpService.put(`todos/${userId}`, userTodos)
    return action
}

async function getActions() {
    const { userTodos } = await _loadActions()
    return userTodos.actions
}


async function _loadActions() {
    const userId = await userService.getUser()
    const userTodos = await httpService.get(`todos/${userId}`)
    if (!userTodos.actions) userTodos.actions = []
    return {userTodos,userId}
}
