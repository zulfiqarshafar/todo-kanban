import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: {},
    status: 'idle',
    error: null
  },
  reducers: {
    taskLoaded: (state, action) => {
      const columnName = `column_${action.payload.columnId}`;
      console.log(columnName);
      return {
        ...state,
        columnName: action.payload.data
      };
    },
    // editTask: (state, action) => {
    //   const {
    //     title,
    //     status,
    //     description,
    //     subtasks,
    //     prevColIndex,
    //     newColIndex,
    //     taskIndex,
    //   } = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const column = board.columns.find((col, index) => index === prevColIndex);
    //   const task = column.tasks.find((task, index) => index === taskIndex);
    //   task.title = title;
    //   task.status = status;
    //   task.description = description;
    //   task.subtasks = subtasks;
    //   if (prevColIndex === newColIndex) return;
    //   column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
    //   const newCol = board.columns.find((col, index) => index === newColIndex);
    //   newCol.tasks.push(task);
    // },
    // dragTask: (state, action) => {
    //   const { colIndex, prevColIndex, taskIndex } = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const prevCol = board.columns.find((col, i) => i === prevColIndex);
    //   const task = prevCol.tasks.splice(taskIndex, 1)[0];
    //   board.columns.find((col, i) => i === colIndex).tasks.push(task);
    // },
    // deleteTask: (state, action) => {
    //   const payload = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const col = board.columns.find((col, i) => i === payload.colIndex);
    //   col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const columnName = `column_${action.payload.columnId}`;
        state.tasks[columnName] = action.payload.taskList;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const columnName = `column_${action.payload.columnId}`;
        state.tasks[columnName].push(action.payload.task);
      })
  }
});

// Thunks
export const fetchTasks = createAsyncThunk('task/fetchTasks', async (payload) => {
  const response = await fetch(`https://todo-api-18-140-52-65.rakamin.com/todos/${payload.columnId}/items`, {
    headers: {
      "Authorization": `Bearer ${payload.userToken}`,
    }});
  const taskList = await response.json();
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
      name: payload.task.title,
      progress_percentage: parseInt(payload.task.progress),
    })
  });
  const newTask = await response.json();
  return {
    task: { id: newTask.id, name: newTask.name, progress_percentage: newTask.progress_percentage},
    columnId: payload.columnId
  };
})

// Selectors
export const selectTasks = (state, columnId) => state.task.tasks[`column_${columnId}`];

export default taskSlice;