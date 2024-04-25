import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sortData } from "../utilities";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: {},
    status: 'idle',
    error: null
  },
  reducers: {
    dragTask: (state, action) => {
      const prevColumnName = `column-${action.payload.task.columnId}`;
      const selectedTask = state.tasks[prevColumnName].find(task => task.id == action.payload.task.id);
      state.tasks[prevColumnName] = sortData(state.tasks[prevColumnName].filter(task => task.id != action.payload.task.id));

      const columnName = `column-${action.payload.task.targetColumnId}`;
      state.tasks[columnName].unshift({ ...selectedTask, todo_id: action.payload.task.targetColumnId });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const columnName = `column-${action.payload.columnId}`;
        state.tasks[columnName] = action.payload.taskList;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const columnName = `column-${action.payload.columnId}`;
        state.tasks[columnName].unshift(action.payload.task);
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const prevColumnName = `column-${action.payload.prevColumnId}`;
        state.tasks[prevColumnName] = sortData(state.tasks[prevColumnName].filter(task => task.id != action.payload.task.id));

        const columnName = `column-${action.payload.columnId}`;
        state.tasks[columnName].unshift(action.payload.task);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const columnName = `column-${action.payload.columnId}`;
        state.tasks[columnName] = sortData(state.tasks[columnName].filter(task => task.id != action.payload.taskId));
      })
  }
});

// Thunks
export const fetchTasks = createAsyncThunk('task/fetchTasks', async (payload) => {
  const response = await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.columnId}/items`, {
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
    }});
  const responseList = await response.json();
  const taskList = sortData(responseList);
  return { taskList, columnId: payload.columnId };
})

export const createTask = createAsyncThunk('task/createTask', async (payload) => {
  const response = await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.columnId}/items`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.task.name,
      progress_percentage: parseInt(payload.task.progress),
    })
  });
  const newTask = await response.json();
  return {
    task: { id: newTask.id, todo_id: newTask.todo_id, name: newTask.name, progress_percentage: newTask.progress_percentage, updated_at: newTask.updated_at},
    columnId: payload.columnId
  };
})

export const moveTask = createAsyncThunk('task/moveTask', async (payload) => {
  const response = await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.task.columnId}/items/${payload.task.id}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_todo_id: parseInt(payload.task.targetColumnId),
    })
  });
  const newTask = await response.json();
  return {
    task: { id: newTask.id, todo_id: newTask.todo_id, name: newTask.name, progress_percentage: newTask.progress_percentage, updated_at: newTask.updated_at},
    columnId: payload.task.targetColumnId,
    prevColumnId: payload.task.columnId
  };
})

export const dragTask = (payload) => async (dispatch) => {
  dispatch({ type: 'task/dragTask', payload });
  await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.task.columnId}/items/${payload.task.id}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_todo_id: parseInt(payload.task.targetColumnId),
    })
  });
};

export const deleteTask = createAsyncThunk('task/deleteTask', async (payload) => {
  await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.task.columnId}/items/${payload.task.id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
    },
  });
  return {
    taskId: payload.task.id,
    columnId: payload.task.columnId,
  };
})

export default taskSlice;