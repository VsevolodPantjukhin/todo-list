import {
  Box,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '@/app/hooks';
import { toggleTask, deleteTask, editTask } from '@features/Task/taskSlice';

interface TaskProps {
  id: number;
  text: string;
  completed: boolean;
}

export const Task: React.FC<TaskProps> = ({ id, text, completed }) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => dispatch(toggleTask(id));
  const handleDelete = () => dispatch(deleteTask(id));
  const handleEdit = () => {
    const newText = prompt('Edit task:', text);
    if (newText) {
      dispatch(editTask({ id, text: newText }));
    }
  };
  return (
    <Box sx={{ textDecoration: completed ? 'line-through' : 'none' }}>
      <Stack direction="row" alignItems="center">
        <Checkbox checked={completed} onChange={handleToggle} />
        <Typography>{text}</Typography>
        <Tooltip title="Редактировать">
          <IconButton onClick={handleEdit}>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить">
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};
