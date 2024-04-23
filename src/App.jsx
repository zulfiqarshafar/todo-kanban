import { useSelector } from 'react-redux';
import Column from './components/Column'
import AddEditTaskModal from './components/AddEditTaskModal';
import './App.css'

function App() {
  const createEditModal = useSelector(state => state.createEditModal);

  return (
    <>
      <header>
        <div className='title'>Product Roadmap</div>
      </header>

      <article id='content'>
        <Column
          columnId='1'
          columnClass='column-group-1'
          columnTitle='Group Task 1'
          columnMonth='January - March'
        />
        <Column
          columnId='2'
          columnClass='column-group-2'
          columnTitle='Group Task 2'
          columnMonth='April - June'
        />
        <Column
          columnId='3'
          columnClass='column-group-3'
          columnTitle='Group Task 3'
          columnMonth='July - September'
        />
        <Column
          columnId='4'
          columnClass='column-group-4'
          columnTitle='Group Task 4'
          columnMonth='October - December'
        />
      </article>

      {
        createEditModal.isOpen && <AddEditTaskModal />
      }
    </>
  )
}

export default App
