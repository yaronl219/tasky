import { runInAction } from "mobx"
import { actionService } from "../services/actionService"
import { useStore } from "./todoContext"

export function createUserActionsStore() {

    return {
        actions: [],
        async addAction(actionTitle) {
            const action = {
                title: actionTitle,
                date: Date.now()
            }
            // await actionService.addAction(action)
            runInAction(() => {
                this.actions.unshift(action)
            })

        },
        async getActions() {
            const actions = await actionService.getActions()
            runInAction(() => {
                this.actions = actions
            })
            return
        }
    }
}