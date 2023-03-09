import { View, Text } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { setUser } from './user.slice';
import { User } from '../Types';

export default function RemoveTestComponent() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  console.log(state);

  const mockUser: User = {
    id: shortid.generate(),
    username: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return (
    <View w="full">
      <Pressable onPress={() => dispatch(setUser(mockUser))}>
        <Text>RemoveTestComponent</Text>
      </Pressable>
    </View>
  );
}