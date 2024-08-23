import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasks = () => {
  const items = localStorage.getItem('tasks');
  if (items !== null) {
    return JSON.parse(items);
  } else return [];
};

const initialState: TasksState = {
  tasks: getTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
      saveTasks(state.tasks.map((task: Task) => task));
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((todo) => todo.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      saveTasks(state.tasks.map((task: Task) => task));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((todo) => todo.id !== action.payload);
      saveTasks(state.tasks.map((task: Task) => task));
    },
    editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const task = state.tasks.find((todo) => todo.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
      saveTasks(state.tasks.map((task: Task) => task));
    },
    changeTaskOrder: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = [...action.payload.tasks];
      saveTasks(state.tasks.map((task: Task) => task));
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, changeTaskOrder } =
  tasksSlice.actions;

export default tasksSlice.reducer;
