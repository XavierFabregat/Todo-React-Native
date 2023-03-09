import React, { useCallback, useState } from 'react';
import {
  Icon,
  VStack,
  useColorModeValue,
  Fab,
  KeyboardAvoidingView
} from 'native-base';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import TaskList from '../components/task-list';
import shortid from 'shortid';
import Masthead from '../components/masthead';
import NavBar from '../components/navbar';
import type { Todo } from '../Types';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { toggleTodoComplete, updateTodo, deleteTodo, addTodo } from '../redux/todo.slice';


export default function MainScreen () {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const data = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleToggleTaskItem = useCallback((item: Todo) => {
    // Send it to Backend
    dispatch(toggleTodoComplete(item.id));
  }, []);

  const handleFinishEditingTaskItem = useCallback((_item: Todo) => {
    // Send it to Backend
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: Todo) => {
    setEditingItemId(item.id);
  }, []);
  
  const handleChangeTaskItemSubject = useCallback((item: Todo, newSubject: string) => {
    // Send it to Backend
    const updatedTodo = {
      ...item,
      title: newSubject,
    }
    dispatch(updateTodo(updatedTodo));
  }, []);

  const handleRemoveItem = useCallback((item: Todo) => {
    // Send it to Backend
    dispatch(deleteTodo(item.id));
  }, []);

  const handleAddItem = useCallback(() => {
    const id = shortid.generate();
    const newTodo = {
      id,
      title: 'New Task',
      completed: false,
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: shortid.generate()
    }
    dispatch(addTodo(newTodo));
    setEditingItemId(id);
  }, []);

  return (
    <AnimatedColorBox 
    bg={useColorModeValue("warmGray.50", "primary.900")}
    flex={1}
    w="full"
    >
      <Masthead title="What's up, Xavi?" image={require('../assets/masthead.png')}>
        <NavBar />
      </Masthead>
      <KeyboardAvoidingView 
        flex={1}
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-20px" 
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
      >
        <VStack 
          flex={1}
          bg={useColorModeValue("warmGray.50", "primary.900")}
          space={1} 
          mt="-20px" 
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          pt="20px"
        >
          <TaskList 
            data={data}
            onToggleItem={handleToggleTaskItem}
            onFinishedEditing={handleFinishEditingTaskItem}
            onPressLabel={handlePressTaskItemLabel}
            onChangeSubject={handleChangeTaskItemSubject}
            onRemoveItem={handleRemoveItem}
            editingItemId={editingItemId}
          />
        </VStack>
      </KeyboardAvoidingView>

      <Fab 
        position="absolute" 
        renderInPortal={false} 
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />}/>}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={handleAddItem}
      />
    </AnimatedColorBox>
  )
};
