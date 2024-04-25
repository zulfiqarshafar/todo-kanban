import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../reducers/taskSlice';
import modalSlice from '../reducers/modalSlice';
import '../assets/css/ActionDropdown.css';
import { RightArrowIcon } from './icons';
import { LeftArrowIcon } from './icons';
import { EditIcon } from './icons';
import { TrashIcon } from './icons';

const ActionDropdown = forwardRef(({ selectedTask, setIsDropdownOpen }, ref) => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleMoveRight(task) {
    dispatch(moveTask({ userToken: userData.token, task: { id: task.id, columnId: task.todo_id, targetColumnId: task.todo_id + 1 } }));
  }

  function handleMoveLeft(task) {
    dispatch(moveTask({ userToken: userData.token, task: { id: task.id, columnId: task.todo_id, targetColumnId: task.todo_id - 1 } }));
  }

  function handleEdit(task) {
    setIsDropdownOpen(false);
    dispatch(modalSlice.actions.toggleCreateEditModal({ columnId: task.todo_id, createOrEdit: 'edit', task }));
  }

  function handleDelete(task) {
    setIsDropdownOpen(false);
    dispatch(modalSlice.actions.toggleDeleteModal({ taskId: task.id, columnId: task.todo_id }));
  }

  return (
    <div className='action-dropdown' ref={ref}>
      <ul>
        <li onClick={() => handleMoveRight(selectedTask)}>
          <RightArrowIcon />
          Move Right
        </li>
        <li onClick={() => handleMoveLeft(selectedTask)}>
          <LeftArrowIcon />
          Move Left
        </li>
        <li onClick={() => handleEdit(selectedTask)}>
          <EditIcon />
          Edit
        </li>
        <li className='action-delete' onClick={() => handleDelete(selectedTask)}>
          <TrashIcon />
          Delete
        </li>
      </ul>
    </div>
  )
});

ActionDropdown.displayName = "ActionDropdown";

export default ActionDropdown