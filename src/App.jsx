import { useState } from 'react';
import './App.css'
import Column from './components/Column'
import AddEditTaskModal from './components/AddEditTaskModal';

function App() {
  const [isOpenCreateEditTask, setIsOpenCreateEditTask] = useState(false);

  return (
    <>
      <header>
        <div className='title'>Product Roadmap</div>
      </header>

      <article id='content'>
        <Column
          columnClass='column-group-1'
          columnTitle='Group Task 1'
          columnMonth='January - March'
          setIsOpenCreateEditTask={setIsOpenCreateEditTask}
        />
        <Column
          columnClass='column-group-2'
          columnTitle='Group Task 2'
          columnMonth='April - June'
          setIsOpenCreateEditTask={setIsOpenCreateEditTask}
        />
        <Column
          columnClass='column-group-3'
          columnTitle='Group Task 3'
          columnMonth='July - September'
          setIsOpenCreateEditTask={setIsOpenCreateEditTask}
        />
        <Column
          columnClass='column-group-4'
          columnTitle='Group Task 4'
          columnMonth='October - December'
          setIsOpenCreateEditTask={setIsOpenCreateEditTask}
        />
      </article>

      {
        isOpenCreateEditTask && <AddEditTaskModal setIsOpenCreateEditTask={setIsOpenCreateEditTask} />
      }
    </>
  )
}

export default App
