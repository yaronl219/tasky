import { httpService } from "./httpService"
import { storageService } from "./storageService"

export const userService = {
    setUser,
    getUser
}

// var isCreatingUser = false

function setUser(userId) {
    storageService.saveToStorage('user', userId)
}

async function _createUser() {
    // TODO: replace with a call from the backend to create an object id from mongo
    // const userId = utilService.makeId(12)
    // if (isCreatingUser) return
    // isCreatingUser = true
    console.log('creating user')
    const res = await httpService.post('todos', { todos: [], actions: [] })
    const userId = res._id

    setUser(userId)
    // isCreatingUser = false
    return userId
}

async function getUser() {
    let userId = storageService.loadFromStorage('user')
    if (!userId) userId = await _createUser()
    return userId
}