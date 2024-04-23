import React from 'react'
import { useDispatch } from 'react-redux';
import createEditModalSlice from "../reducers/createEditModalSlice";
import Task from './Task'
import plusIcon from '../assets/images/plus-circle.svg'
import '../assets/css/Column.css'

function Column({ columnId, columnClass, columnTitle, columnMonth }) {
  const dispatch = useDispatch();

  function handleOpenModal() {
    dispatch(createEditModalSlice.actions.toggleModal({ columnId: columnId, createOrEdit: 'create' }));
  }

  return (
    <section className={`column ${columnClass}`}>
      <div className='column-title'>{ columnTitle }</div>
      <div className='column-month'>{ columnMonth }</div>

      <Task title='Data Migration: Performance & Culture End Game' progress='100' />

      <section className='task no-task'>
        <div className="task-title no-task-title">No Task</div>
      </section>

      <div className='new-task-btn' onClick={handleOpenModal}>
        <img src={plusIcon} alt="Plus icon" />
        New Task
      </div>
    </section>
  )
}

export default Column