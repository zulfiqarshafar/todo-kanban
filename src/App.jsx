import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks } from './reducers/taskSlice';
import userSlice from './reducers/userSlice';
import Column from './components/Column'
import CreateEditTaskModal from './components/modals/CreateEditTaskModal';
import './App.css'
import DeleteTaskModal from './components/modals/DeleteTaskModal';

function App() {
  const taskColumnOne = useSelector(state => selectTasks(state, 1));
  const taskColumnTwo = useSelector(state => selectTasks(state, 2));
  const taskColumnThree = useSelector(state => selectTasks(state, 3));
  const taskColumFour = useSelector(state => selectTasks(state, 4));
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

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
    .then((userData) => {
      dispatch(userSlice.actions.setToken({ token: userData.auth_token }));
      dispatch(fetchTasks({ userToken: userData.auth_token, columnId: 1 }));
      dispatch(fetchTasks({ userToken: userData.auth_token, columnId: 2 }));
      dispatch(fetchTasks({ userToken: userData.auth_token, columnId: 3 }));
      dispatch(fetchTasks({ userToken: userData.auth_token, columnId: 4 }));
    });
  }

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <>
      <header>
        <div className='title'>Product Roadmap</div>
      </header>

      <article id='content'>
        <Column
          columnId='1'
          columnClass='column-group-1'
          columnTitle='Group Task 1'
          columnMonth='January - March'
          taskList={taskColumnOne}
        />
        <Column
          columnId='2'
          columnClass='column-group-2'
          columnTitle='Group Task 2'
          columnMonth='April - June'
          taskList={taskColumnTwo}
        />
        <Column
          columnId='3'
          columnClass='column-group-3'
          columnTitle='Group Task 3'
          columnMonth='July - September'
          taskList={taskColumnThree}
        />
        <Column
          columnId='4'
          columnClass='column-group-4'
          columnTitle='Group Task 4'
          columnMonth='October - December'
          taskList={taskColumFour}
        />
      </article>

      { modal.isCreateEditOpen && <CreateEditTaskModal /> }
      { modal.isDeleteOpen && <DeleteTaskModal /> }
    </>
  )
}

export default App
