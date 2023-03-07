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

  const [checked, isChecked] = React.useState<boolean>(false);

  const handleCheckboxPress = () => {
    isChecked(prev => !prev);
  }

  return (
    <Center 
    _dark={{ bg: 'blueGray.900' }} 
    _light={{ bg: 'blueGray.50' }} 
    px={4} 
    flex={1}
    >
      <VStack space={5} alignItems="center">
        <TaskItem isDone={checked} onToggleCheckbox={handleCheckboxPress}/>
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