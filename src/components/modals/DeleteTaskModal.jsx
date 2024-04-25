import { useDispatch, useSelector } from 'react-redux';
import modalSlice from '../../reducers/modalSlice';
import { deleteTask } from '../../reducers/taskSlice';
import closeIcon from '../../assets/images/close.svg'
import warningIcon from '../../assets/images/warning.svg'
import '../../assets/css/Modal.css'

function DeleteTaskModal() {
  const userData = useSelector(state => state.user);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(modalSlice.actions.toggleDeleteModal({ taskId: null, columnId: null }));
  }

  function handleDeleteTask() {
    dispatch(deleteTask({ userToken: userData.token, task: { id: modal.taskId, columnId: modal.columnId } }));
    handleCloseModal();
  }

  return (
    <div className='modal-overlay'>
      <article className='modal delete-task-modal'>
        <header>
          <div className='modal-title'>
            <img src={warningIcon} alt="Warning icon" />
            Delete Task
          </div>
          <span id='close-btn' onClick={handleCloseModal}>
            <img src={closeIcon} alt="Close icon" />
          </span>
        </header>
        <section className="modal-content">
          Are you sure want to delete this task? Your action can&#x2019;t be reverted.
        </section>
        <footer>
          <button onClick={handleCloseModal}>Cancel</button>
          <button id='delete-task-btn' onClick={handleDeleteTask}>Delete</button>
        </footer>
      </article>
    </div>
  )
}

export default DeleteTaskModal