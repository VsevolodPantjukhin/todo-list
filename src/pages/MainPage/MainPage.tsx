import { Box, Typography } from '@mui/material';
import { TasksList } from '@/widgets/TasksList/TasksList';
import { TaskInput } from '@/features/TaskInput/TaskInput';

export const MainPage = () => {
  return (
    <Box mt={2} gap={3}>
      <Typography>Todo List</Typography>
      <TaskInput />
      <TasksList />
    </Box>
  );
};
