import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { dragTask, fetchTasks } from './reducers/taskSlice';
import userSlice from './reducers/userSlice';
import Column from './components/Column'
import CreateEditTaskModal from './components/modals/CreateEditTaskModal';
import DeleteTaskModal from './components/modals/DeleteTaskModal';
import './App.css'

function App() {
  const userData = useSelector(state => state.user);
  const tasks = useSelector(state => state.task.tasks);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const columnData = [
    { id: '1', month: 'January - March', columnName: 'column-1'},
    { id: '2', month: 'April - June', columnName: 'column-2'},
    { id: '3', month: 'July - September', columnName: 'column-3'},
    { id: '4', month: 'October - December', columnName: 'column-4'}
  ];

  function handleToken() {
    fetch("https://todo-api-18-140-52-65.rakamin.com/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: 'zul.shafar@gmail.com',
        password: 'password',
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(userSlice.actions.setToken({ token: response.auth_token }));
      dispatch(fetchTasks({ userToken: response.auth_token, columnId: 1 }));
      dispatch(fetchTasks({ userToken: response.auth_token, columnId: 2 }));
      dispatch(fetchTasks({ userToken: response.auth_token, columnId: 3 }));
      dispatch(fetchTasks({ userToken: response.auth_token, columnId: 4 }));
    });
  }

  async function handleDragTask(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch(dragTask({ userToken: userData.token, task: { id: draggableId, columnId: source.droppableId, targetColumnId: destination.droppableId } }));
  }

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleDragTask}>
        <header>
          <div className='title'>Product Roadmap</div>
        </header>

        <article id='content'>
          {
            columnData.map(column => (
              <Column
                key={column.id}
                columnId={column.id}
                columnClass={column.columnName}
                columnTitle={`Group Task ${column.id}`}
                columnMonth={column.month}
                taskList={tasks[column.columnName]}
              />
            ))
          }
        </article>

        { modal.isCreateEditOpen && <CreateEditTaskModal /> }
        { modal.isDeleteOpen && <DeleteTaskModal /> }
      </DragDropContext>
    </>
  )
}

export default App
