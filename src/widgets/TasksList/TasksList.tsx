import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { changeTaskOrder } from '@/features/Task/taskSlice';
import { RootState } from '@/app/store';
import { List, ListItem, Box, Divider } from '@mui/material';
import { Task } from '@/features/Task/Task';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { Selector } from '@/shared/Selector/Selector';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

export const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [filter, setFilter] = useState<'default' | 'completed' | 'uncompleted'>(
    'default'
  );
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const filterOptions = [
    { label: 'Все', value: 'default' },
    { label: 'Выполненные', value: 'completed' },
    { label: 'Невыполненные', value: 'uncompleted' },
  ];

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as 'default' | 'completed' | 'uncompleted');
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeTaskOrder({ tasks: items }));
  };

  useEffect(() => {
    if (filter === 'default') {
      setFilteredTasks([...tasks]);
    } else if (filter === 'completed') {
      setFilteredTasks([...tasks.filter((task) => task.completed)]);
    } else {
      setFilteredTasks([...tasks.filter((task) => !task.completed)]);
    }
  }, [filter, tasks]);

  return (
    <Box mt={5} ml={2} mr={2}>
      <Divider />
      <Selector
        label="Задачи"
        options={filterOptions}
        value={filter}
        handleChange={handleFilterChange}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Task {...task} />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
