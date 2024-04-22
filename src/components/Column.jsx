import React from 'react'
import Task from './Task'
import plusIcon from '../assets/images/plus-circle.svg'
import '../assets/css/Column.css'

function Column({ columnClass, columnTitle, columnMonth, setIsOpenCreateEditTask }) {
  return (
    <section className={`column ${columnClass}`}>
      <div className='column-title'>{ columnTitle }</div>
      <div className='column-month'>{ columnMonth }</div>
      <Task />
      <div className='new-task-btn' onClick={() => setIsOpenCreateEditTask(true)}>
        <img src={plusIcon} alt="Plus Icon" />
        New Task
      </div>
    </section>
  )
}

export default Column