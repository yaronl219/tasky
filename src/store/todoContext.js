import React from 'react'
import { createTodoStore } from './todoStore'
import { useLocalStore } from 'mobx-react'
import { createUserActionsStore } from './userActionsStore'
import { createUserStore } from './userStore'

const StoreContext = React.createContext(null)

export const StoreProvider = ({ children }) => {
    const todoStore = useLocalStore(createTodoStore)
    const actionStore = useLocalStore(createUserActionsStore)
    const userStore = useLocalStore(createUserStore)

    const stores = {
        todoStore,
        actionStore,
        userStore
    }

    return <StoreContext.Provider value={stores}>
        {children}
    </StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
