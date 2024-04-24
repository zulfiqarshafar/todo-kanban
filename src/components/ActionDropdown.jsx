import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../reducers/taskSlice';
import '../assets/css/ActionDropdown.css';
import { RightArrowIcon } from './icons';
import { LeftArrowIcon } from './icons';
import { EditIcon } from './icons';
import { TrashIcon } from './icons';

const ActionDropdown = forwardRef(({ selectedTask }, ref) => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleMoveRight(task) {
    dispatch(moveTask({ userToken: userData.token, task: { id: task.id, name: task.name, columnId: task.todo_id, targetColumnId: task.todo_id + 1 } }));
  }

  function handleMoveLeft(task) {
    dispatch(moveTask({ userToken: userData.token, task: { id: task.id, name: task.name, columnId: task.todo_id, targetColumnId: task.todo_id - 1 } }));
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
        <li>
          <EditIcon />
          Edit
        </li>
        <li className='action-delete'>
          <TrashIcon />
          Delete
        </li>
      </ul>
    </div>
  )
});

ActionDropdown.displayName = "ActionDropdown";

export default ActionDropdown