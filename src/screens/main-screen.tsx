import React, { useCallback, useState } from 'react';
import {
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import ThemeToggle from '../components/theme-toggle';
import TaskList from '../components/task-list';
import shortid from 'shortid';
import Masthead from '../components/masthead';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Learn React Native',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Learn NativeBase',
    done: false,
  }
]

export default function MainScreen () {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('Task Item');
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleCheckboxPress = useCallback(() => {
    setChecked(prev => !prev);
  }, []);

  const handleToggleTaskItem = useCallback((item: typeof initialData[0]) => {
    // Send it to Backend
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      }
      return newData;
    })
  }, []);

  const handleFinishEditingTaskItem = useCallback((_item: typeof initialData[0]) => {
    // Send it to Backend
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: typeof initialData[0]) => {
    setEditingItemId(item.id);
  }, []);
  
  const handleChangeTaskItemSubject = useCallback((item: typeof initialData[0], newSubject: string) => {
    // Send it to Backend
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      }
      return newData;
    })
  }, []);

  const handleRemoveItem = useCallback((item: typeof initialData[0]) => {
    // Send it to Backend
    setData(prevData => {
      const newData = prevData.filter(i => i.id !== item.id);
      return newData;
    })
  }, []);

  return (
    <AnimatedColorBox 
    bg={useColorModeValue("warmGray.50", "primary.900")}
    flex={1}
    w="full"
    >
      <Masthead title="What's up, Xavi!" image={require('../assets/masthead.png')}>

      </Masthead>
      <VStack space={5} alignItems="center" w="full">
        <TaskList 
          data={data}
          onToggleItem={handleToggleTaskItem}
          onFinishedEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onChangeSubject={handleChangeTaskItemSubject}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
      <Fab 
        position="absolute" 
        renderInPortal={false} 
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />}/>}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData(prevData => (
            [{
              id,
              subject: 'New Task',
              done: false,
            }, 
            ...prevData]
          ))
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  )
};
