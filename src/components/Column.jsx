import React from 'react'
import Task from './Task'
import plusIcon from '../assets/images/plus-circle.svg'
import '../assets/css/Column.css'

function Column({ columnClass, columnTitle, columnMonth, setIsOpenCreateEditTask }) {

  return (
    <section className={`column ${columnClass}`}>
      <div className='column-title'>{ columnTitle }</div>
      <div className='column-month'>{ columnMonth }</div>

      <Task title='Data Migration: Performance & Culture End Game' progress='100' />

      <section className='task no-task'>
        <div className="task-title no-task-title">No Task</div>
      </section>

      <div className='new-task-btn' onClick={() => setIsOpenCreateEditTask(true)}>
        <img src={plusIcon} alt="Plus icon" />
        New Task
      </div>
    </section>
  )
}

export default Column