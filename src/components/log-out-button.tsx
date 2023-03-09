import React from 'react';
import { Box, Pressable, useColorModeValue, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '../hooks/redux.hooks';
import { removeUser } from '../redux/user.slice';

export default function LogOutButton() {

  const dispatch = useAppDispatch();

  return (
    <Box>
      <Pressable onPress={() => {dispatch(removeUser())}} padding={2}>
         <Icon as={<Entypo name={"log-out"}  />} size="2xl" color={useColorModeValue("red.500", "red.400")} bgColor={"red"}/>
      </Pressable>
    </Box>
  );
}