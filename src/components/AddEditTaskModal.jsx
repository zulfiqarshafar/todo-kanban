import React from 'react'
import closeIcon from '../assets/images/close.svg'
import '../assets/css/AddEditTaskModal.css'

function AddEditTaskModal({ setIsOpenCreateEditTask }) {
  return (
    <div className='create-edit-task-modal-overlay'>
      <article className='create-edit-task-modal'>
        <header>
          CreateEdit Task
          <span id='close-btn' onClick={() => setIsOpenCreateEditTask(false)}>
            <img src={closeIcon} alt="Close icon" />
          </span>
        </header>
        <section className='input-form'>
          <div className="input-group">
            <label htmlFor="input-task-name">Task Name</label>
            <input id="input-task-name" type="text" placeholder='Type your Task' />
          </div>
          <div className="input-group">
            <label htmlFor="input-progress">Progress</label>
            <input id="input-progress" type="text" placeholder='70%' />
          </div>
        </section>
        <footer>
          <button onClick={() => setIsOpenCreateEditTask(false)}>Cancel</button>
          <button id='save-task-btn'>Save Task</button>
        </footer>
      </article>
    </div>
  )
}

export default AddEditTaskModal