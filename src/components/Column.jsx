import React from 'react'
import Task from './Task'
import '../assets/css/Column.css'

function Column({ columnClass, columnTitle, columnMonth }) {
  return (
    <section className={`column ${columnClass}`}>
      <div className='column-title'>{ columnTitle }</div>
      <div className='column-month'>{ columnMonth }</div>
      <Task />
      <div>New Task</div>
    </section>
  )
}

export default Column