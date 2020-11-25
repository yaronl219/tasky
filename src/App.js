

import { AddTodo } from './cmps/AddTodo';
import { TodosList } from './cmps/TodosList';
import { useStore } from './store/todoContext';
import { DragDropContext } from 'react-beautiful-dnd'
import { ActionBar } from './cmps/ActionBar';
import React, { useEffect, useState } from 'react';
import { Navbar } from './cmps/Navbar';
import './assets/styles/global.scss'
import { Button, CircularProgress, Dialog, Popover } from '@material-ui/core';
import { About } from './cmps/About';
import { Login } from './cmps/Login';
import { userService } from './services/userService';
import { RandomTasks } from './cmps/RandomTasks';

function App() {

  const store = useStore()

  const { todoStore } = store
  const { actionStore } = store
  const { userStore } = store

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isAboutOpen, setAboutOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoginScreenOpen, setLoginScreenOpen] = useState(false)
  const [isRandomTaskOpen, setRandomTaskOpen] = useState(false)

  function toggleDrawer() {
    setDrawerOpen(!isDrawerOpen)
  }

  function toggleAbout() {
    setAboutOpen(!isAboutOpen)
  }

  function toggleLoginScreen() {
    setLoginScreenOpen(!isLoginScreenOpen)
  }

  async function onDragEnd(e) {
    const { destination, source } = e
    const movedTodoTitle = todoStore.todos[source.index].title
    if (!destination || destination.index === source.index) return
    await todoStore.changeOrder(source.index, destination.index)
    await actionStore.addAction(`Moved ${movedTodoTitle}`)
  }

  async function onLoad() {
    await todoStore.getTodos()
    await actionStore.getActions()
    setIsLoaded(true)
  }

  function checkIfUserLoggedIn() {
    // for remember me
    if (userService.getLoggedInStatus()) userStore.setLoginLocally()
  }

  useEffect(() => {
    onLoad()
    checkIfUserLoggedIn()
  }, [])
  


  return (

    <div className="App">
      <Navbar toggleDrawer={toggleDrawer} toggleAbout={toggleAbout} toggleLogin={toggleLoginScreen} />
      {(isLoaded) ? (<React.Fragment >
        <main>
          <DragDropContext onDragEnd={onDragEnd}>
            <TodosList />
          </DragDropContext>
          <AddTodo />
          <div className="random-task-btn-container">
            <Button onClick={()=>setRandomTaskOpen(true)} color="secondary">Or... add some random tasks</Button>
          </div>
          <Dialog open={isRandomTaskOpen} onClose={() => setRandomTaskOpen(false)} onBackdropClick={() => setRandomTaskOpen(false)}>
            <RandomTasks onClose={() => setRandomTaskOpen(false)} />
          </Dialog>
        </main>
        <aside>
          <ActionBar isOpen={isDrawerOpen} />
        </aside>
        <Dialog open={isAboutOpen} onBackdropClick={toggleAbout} onClose={toggleAbout}>
          <About toggleAbout={toggleAbout} />
        </Dialog>
        <Dialog open={isLoginScreenOpen} onBackdropClick={toggleLoginScreen} onClose={toggleLoginScreen}>
          <Login toggleLogin={toggleLoginScreen} />
        </Dialog>
      </React.Fragment>) : <CircularProgress />
      }
    </div >

  );

}

export default App;
