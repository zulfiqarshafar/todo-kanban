import React from 'react'
import Task from './Task'
import '../assets/css/Board.css'

function Board() {
  return (
    <section className='board'>
      <div className='board-title'>Group Task 1</div>
      <div className='board-month'>January - March</div>
      <Task />
      <div>New Task</div>
    </section>
  )
}

export default Board