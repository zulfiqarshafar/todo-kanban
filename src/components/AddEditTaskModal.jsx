import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import createEditModalSlice from '../reducers/createEditModalSlice';
import { createTask } from '../reducers/taskSlice';
import closeIcon from '../assets/images/close.svg'
import '../assets/css/AddEditTaskModal.css'

function AddEditTaskModal() {
  const [name, setName] = useState('')
  const [progress, setProgress] = useState('')
  const userData = useSelector(state => state.user);
  const createEditModal = useSelector(state => state.createEditModal);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(createEditModalSlice.actions.toggleModal({ columnId: null, createOrEdit: null }));
  }

  function handleSaveTask(e) {
    e.preventDefault();
    dispatch(createTask({ userToken: userData.token, columnId: createEditModal.columnId, task: { title: name, progress } }));
    dispatch(createEditModalSlice.actions.toggleModal({ columnId: null, createOrEdit: null }));
    setName('');
    setProgress('');
  }

  return (
    <div className='create-edit-task-modal-overlay'>
      <article className='create-edit-task-modal'>
        <header>
          {createEditModal.createOrEdit == 'create' ? 'Create' : 'Edit'} Task
          <span id='close-btn' onClick={handleCloseModal}>
            <img src={closeIcon} alt="Close icon" />
          </span>
        </header>
        <form onSubmit={handleSaveTask} className='input-form'>
          <div className="input-group">
            <label htmlFor="input-task-name">Task Name</label>
            <input id="input-task-name" type="text" placeholder='Type your Task' value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="input-group input-progress-wrapper">
            <label htmlFor="input-progress">Progress</label>
            <input id="input-progress" type="number" placeholder='70%' min='0' max='100' value={progress} onChange={e => setProgress(e.target.value)} />
          </div>
          <footer>
            <button type='button' onClick={handleCloseModal}>Cancel</button>
            <button type='submit' id='save-task-btn' disabled={!name || !progress}>Save Task</button>
          </footer>
        </form>
      </article>
    </div>
  )
}

export default AddEditTaskModal