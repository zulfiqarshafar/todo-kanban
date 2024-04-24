import { useDispatch } from 'react-redux';
import createEditModalSlice from "../reducers/createEditModalSlice";
import Task from './Task'
import plusIcon from '../assets/images/plus-circle.svg'
import '../assets/css/Column.css'

function Column({ columnId, columnClass, columnTitle, columnMonth, taskList }) {
  const dispatch = useDispatch();

  function handleOpenModal() {
    dispatch(createEditModalSlice.actions.toggleModal({ columnId: columnId, createOrEdit: 'create' }));
  }

  return (
    <section className={`column ${columnClass}`}>
      <div className='column-title'>{ columnTitle }</div>
      <div className='column-month'>{ columnMonth }</div>

      {
        taskList && taskList.length > 0 ? (
          taskList.map(task => (
            <Task key={task.id} title={task.name} progress={task.progress_percentage || 0} />
          ))
        ) : (
          <section className='task no-task'>
            <div className="task-title no-task-title">No Task</div>
          </section>
        )
      }

      <div className='new-task-btn' onClick={handleOpenModal}>
        <img src={plusIcon} alt="Plus icon" />
        New Task
      </div>
    </section>
  )
}

export default Column