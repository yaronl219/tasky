import { runInAction } from "mobx"
import { userService } from "../services/userService"

export function createUserStore() {
    return {
        isLoggedIn: false,
        async login(username, password) {
            const user = await userService.login(username, password)
            if (!user) return
            runInAction(() => {
                this.isLoggedIn = true
            })
            return user
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