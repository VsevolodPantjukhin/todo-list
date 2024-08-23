import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addTask } from '@/features/Task/taskSlice';
import { TextField, Button, Box } from '@mui/material';

export const TaskInput: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask(text));
      setText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        width="50%"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить новую задачу"
        />
        <Button disabled={!text} variant="contained" type="submit">
          Добавить
        </Button>
      </Box>
    </form>
  );
};
