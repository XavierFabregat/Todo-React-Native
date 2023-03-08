import React, { useCallback, useRef } from 'react';
import { AnimatePresence, View } from 'moti';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import TaskItem from './task-item';
import { makeStyledComponent } from '../utils/styled';
import { ScrollView } from 'react-native-gesture-handler';

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

interface TaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface TaskListProps {
  data: TaskItemData[];
  editingItemId: string | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishedEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishedEditing: (item: TaskItemData) => void;
  onRemove: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
}

export const AnimatedTaksItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishedEditing,
    onPressLabel,
    onRemove,
  } = props;

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback((subject: string) => {
    onChangeSubject(data, subject)
  }, [data, onChangeSubject])

  const handleFinishEditing = useCallback(() => {
    onFinishedEditing(data)
  }, [data, onFinishedEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove]);


  return (
    <StyledView
      w="full" 
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <TaskItem 
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isEditing={isEditing}
        isDone={data.done}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )

};

export default function TaskList(props: TaskListProps) {
  const { 
    data, 
    editingItemId, 
    onToggleItem, 
    onChangeSubject, 
    onFinishedEditing, 
    onPressLabel, 
    onRemoveItem 
  } = props;

  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <StyledScrollView
      ref={scrollViewRef}
      w="full"
    >
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaksItem 
            key={item.id}
            data={item}
            simultaneousHandlers={scrollViewRef}
            isEditing={editingItemId === item.id}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishedEditing={onFinishedEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}