import { View, Text, useColorModeValue } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import shortid from 'shortid';
import { setUser, removeUser } from './user.slice';
import { User } from '../Types';

export default function RemoveTestComponent() {
  
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);

  console.log(state);

  const userId = shortid.generate();

  const mockUser: User = {
    id: userId,
    username: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    todos: [
      {
        id: shortid.generate(),
        title: 'Test todo',
        description: 'This is a test todo',
        userId,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }
  return (
    <View 
      w="full" 
      borderColor={useColorModeValue('warmGray.50','primary.900')} 
      h="100px"
      borderWidth={1}
      borderRadius="md"
      p={4}
      alignItems="center"
      justifyContent="center" 
    >
      <Pressable 
        onPress={() => dispatch(setUser(mockUser))}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: pressed ? 'red' : 'blue',
            padding: 10,
            borderRadius: 8,
          }
        ]}

      >
        {({pressed}) => (
          <Text
            style={[
              {
                color: pressed ? 'blue' : 'white',
              }
            ]}
          >Add Test User to State</Text>
        )}
      </Pressable>
      <Pressable 
        onPress={() => dispatch(removeUser())}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: pressed ? 'red' : 'blue',
            padding: 10,
            borderRadius: 8,
          }
        ]}

      >
        {({pressed}) => (
          <Text
            style={[
              {
                color: pressed ? 'blue' : 'white',
              }
            ]}
          >Remove Test User to State</Text>
        )}
      </Pressable>
    </View>
  );
}