import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import modalSlice from '../../reducers/modalSlice';
import { createTask, deleteTask } from '../../reducers/taskSlice';
import closeIcon from '../../assets/images/close.svg'
import '../../assets/css/Modal.css'

function CreateEditTaskModal() {
  const [name, setName] = useState('')
  const [progress, setProgress] = useState('')
  const userData = useSelector(state => state.user);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(modalSlice.actions.toggleCreateEditModal({ columnId: null, createOrEdit: null, task: {} }));
  }

  function handleSaveTask(e) {
    e.preventDefault();
    if (modal.createOrEdit == 'create') {
      dispatch(createTask({ userToken: userData.token, columnId: modal.columnId, task: { name: name, progress } }));
    } else {
      dispatch(deleteTask({ userToken: userData.token, task: { id: modal.taskId, columnId: modal.columnId } }));
      dispatch(createTask({ userToken: userData.token, columnId: modal.columnId, task: { name: name, progress } }));
    }
    dispatch(modalSlice.actions.toggleCreateEditModal({ columnId: null, createOrEdit: null, task: {} }));
    setName('');
    setProgress('');
  }

  useEffect(() => {
    if (modal.task.name && modal.task.progress != undefined) {
      setName(modal.task.name);
      setProgress(modal.task.progress);
    }
  }, [modal.task])

  return (
    <div className='modal-overlay'>
      <article className='modal create-edit-task-modal'>
        <header>
          <div>{ modal.createOrEdit == 'create' ? 'Create' : 'Edit' } Task</div>
          <span id='close-btn' onClick={handleCloseModal}>
            <img src={closeIcon} alt="Close icon" />
          </span>
        </header>
        <section className="modal-content">
          <form onSubmit={handleSaveTask}>
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
        </section>
      </article>
    </div>
  )
}

export default CreateEditTaskModal