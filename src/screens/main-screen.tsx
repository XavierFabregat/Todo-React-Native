import React, { useCallback, useState } from 'react';
import {
  Text,
  Box,
  Center,
  VStack,
  useColorModeValue,
} from 'native-base';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import ThemeToggle from '../components/theme-toggle';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import TaskItem from '../components/task-item';

export default function MainScreen () {

  const [checked, setChecked] = React.useState<boolean>(false);
  const [subject, setSubject] = React.useState<string>('Task Item');
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const handleCheckboxPress = () => {
    setChecked(prev => !prev);
  }

  return (
    <Center 
    _dark={{ bg: 'blueGray.900' }} 
    _light={{ bg: 'blueGray.50' }} 
    flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem 
          isEditing={isEditing}
          isDone={checked} 
          onToggleCheckbox={handleCheckboxPress}
          subject={subject}
          onChangeSubject={setSubject}
          onFinishEditing={() => setEditing(false)}
          onPressLabel={() => setEditing(true)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 64,
    height: 64,
  },
});