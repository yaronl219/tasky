import { runInAction } from "mobx"
import { userService } from "../services/userService"

export function createUserStore() {
    return {
        isLoggedIn: false,
        async login(username, password) {
            await userService.login(username, password)
            runInAction(() => {
                this.isLoggedIn = true
            })

        },
        async signup(username, password) {
            await userService.signup(username, password)
            runInAction(() => {
                this.isLoggedIn = true
            })
        
    },
        async logout() {
        await userService.logout()
        runInAction(() => {
            this.isLoggedIn = false
        })
    },
    setLoginLocally() {
        this.isLoggedIn = true
    }
}
}