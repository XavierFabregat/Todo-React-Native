import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  Pressable
} from 'react-native';
import {
  Box,
  HStack,
  useTheme,
  themeTools,
  useColorModeValue,
  Icon,
  Input
} from 'native-base';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import AnimatedLabel from './animated-task-label';
import SwipableView from './swipable-view';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import { TextInputChangeEventData } from 'react-native';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isEditing: boolean;
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
  subject: string;
}

export default function TaskItem(props: Props) {
  
  const { 
    isEditing,
    isDone, 
    onToggleCheckbox, 
    onPressLabel, 
    onRemove, 
    subject,
    onChangeSubject,
    onFinishEditing,
    simultaneousHandlers,
  } = props;

  const theme = useTheme();
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400'),
  );
  const boxOutlineColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500'),
  );
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white'),
  );
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText'),
  );
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600'),
  );

  const handleChangeSubject = useCallback( 
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    onChangeSubject && onChangeSubject(e.nativeEvent.text);
  }, [onChangeSubject])

  return (
    <SwipableView 
      simultaneousHandlers={simultaneousHandlers} 
      onSwipeLeft={onRemove}
      backView={
        <Box 
          w="full" 
          h="full" 
          bg="red.500" 
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon as={<Feather name='trash-2' />} size="sm" color="white" />
        </Box>
      }
    >
      <HStack 
        alignItems="center" 
        w="full" 
        px={4} 
        py={2} 
        bg={useColorModeValue('warmGray.50','primary.900')}
      >
      <Box width={30} height={30} mr={2}>
        <Pressable onPress={onToggleCheckbox}>
          <AnimatedCheckbox 
            highlightColor={highlightColor}
            boxOutlineColor={boxOutlineColor}
            checkmarkColor={checkmarkColor}
            checked={isDone}
          />
        </Pressable>
      </Box>
      {isEditing 
      ? (
        <Input 
          placeholder='Task' 
          value={subject}   
          variant="unstyled"
          fontSize={19}
          px={1}
          py={0}
          autoFocus
          blurOnSubmit
          cursorColor={"red"}
          onChange={handleChangeSubject}
          onBlur={onFinishEditing}
        />
      )
      : (
      <AnimatedLabel
        textColor={activeTextColor}
        inactiveTextColor={doneTextColor}
        strikeThrough={isDone}
        onPress={onPressLabel}
      >
        {subject}
      </AnimatedLabel>
      )}
      </HStack>
    </SwipableView>
  )
}