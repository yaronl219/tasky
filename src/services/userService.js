import { httpService } from "./httpService"
import { storageService } from "./storageService"

export const userService = {
    setUser,
    getUser,
    login,
    getLoggedInStatus,
    signup,
    logout
}

// var isCreatingUser = false

function setUser(userId) {
    storageService.saveToStorage('user', userId)
}

async function login(username, password) {
    try {
        let res = await httpService.post('auth/login', { username, password })
        res = JSON.parse(res)
        if (res.error) return
        setUser(res.collectionId)
        _setLoginStatus(true)
        return res
    } catch (err) {
        console.log(err)
    }
}

async function signup(username, password) {
    let collectionId = await getUser()
    try {
        const res = await httpService.post('auth/signup', { username, password, collectionId })
        if (res.error) return

        _setLoginStatus(true)
    } catch (err) {
        console.log(err)
    }
}

async function getUser() {
    let userId = storageService.loadFromStorage('user')
    if (!userId) userId = await _createUser()
    return userId
}

function getLoggedInStatus() {
    return !!storageService.loadFromStorage('isRegisteredUser')
}

async function logout() {
    _setLoginStatus(false)
    await _createUser()
    return
}

async function _createUser() {
    // TODO: replace with a call from the backend to create an object id from mongo
    // const userId = utilService.makeId(12)
    // if (isCreatingUser) return
    // isCreatingUser = true
    const userId = await httpService.post('todos', { todos: [], actions: [] })
    setUser(userId)
    // isCreatingUser = false
    return userId
}


function _setLoginStatus(isLoggedIn) {
    storageService.saveToStorage('isRegisteredUser', isLoggedIn)
}

