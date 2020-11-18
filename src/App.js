

import { AddTodo } from './cmps/AddTodo';
import { TodosList } from './cmps/TodosList';
import { useStore } from './store/todoContext';
import { DragDropContext } from 'react-beautiful-dnd'
import { ActionBar } from './cmps/ActionBar';
import React, { useEffect, useState } from 'react';
import { Navbar } from './cmps/Navbar';
import './assets/styles/global.scss'
import { CircularProgress, Dialog } from '@material-ui/core';
import { About } from './cmps/About';

function App() {

  const store = useStore()

  const { todoStore } = store
  const { actionStore } = store

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isAboutOpen, setAboutOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  function toggleDrawer() {
    setDrawerOpen(!isDrawerOpen)
  }

  function toggleAbout() {
    setAboutOpen(!isAboutOpen)
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

  useEffect(() => {
    onLoad()
  }, [])
  


  return (

    <div className="App">
      <Navbar toggleDrawer={toggleDrawer} toggleAbout={toggleAbout} />
      {(isLoaded) ? (<React.Fragment >
        <main>
          <DragDropContext onDragEnd={onDragEnd}>
            <TodosList />
          </DragDropContext>
          <AddTodo />
        </main>
        <aside>
          <ActionBar isOpen={isDrawerOpen} />
        </aside>
        <Dialog open={isAboutOpen} onBackdropClick={toggleAbout} onClose={toggleAbout}>
          <About toggleAbout={toggleAbout} />
        </Dialog>
      </React.Fragment>) : <CircularProgress />
      }
    </div >

  );

}

export default App;
