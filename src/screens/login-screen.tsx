import React from 'react';
import {
  View,
  Box,
  VStack,
  useColorModeValue,
  Image,
  Input,
  Switch,
  HStack,
  Text,
  Icon,
  Pressable
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Masthead from '../components/masthead';
import ThemeToggle from '../components/theme-toggle';
import { Entypo } from '@expo/vector-icons';
import type { User } from '../Types';
import shortid from 'shortid';
import { useAppDispatch } from '../hooks/redux.hooks';
import { setUser } from '../redux/user.slice';

export default function LoginScreen () {

  const dispatch = useAppDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin () {
    // send username and password to backend and get user object
    if (!password || !username) {
      return;
    }
    const mockUser: User = { // TODO: remove this mock user and use the real user object
      id: shortid.generate(),
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      todos: []
    }
    dispatch(setUser(mockUser));
  }



  function passwordToggle () {
    return (
      <HStack space={2} alignItems="center" paddingX={3}>
        <Pressable onPress={() => setIsPasswordVisible(prev => !prev)}>
          <Icon as={<Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'}  />} size="lg" color={useColorModeValue('black', 'white')} />
        </Pressable>
      </HStack>
    )
  }

  function InputLabel ({label} : {label: string}) {
    return (
      <View 
        paddingX={3} 
        width={100}
        backgroundColor={useColorModeValue('blue.300', 'purple.700')} 
        h={"full"} 
        alignContent="center"
        justifyItems={"center"}
        justifyContent={"center"}
      >
        <Text 
          fontSize="sm" 
          fontWeight="bold" 
          color={useColorModeValue('black', 'white')}
          textAlign="center"
        >
          {label}
        </Text>
      </View>
    )
  }


  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50','warmGray.900')}
      w="full"
    >
      <Masthead 
        title="Login" 
        image={require('../assets/login-masthead.png')}
      >
      </Masthead>
      <View
        flex={1} 
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50','primary.900')}
        mt={"-20px"}
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Input 
              type='text'
              isRequired
              variant={isPasswordVisible ? 'filled' : 'outline'}
              InputLeftElement={InputLabel({label: 'Username'})}
              bgColor={useColorModeValue('warmGray.50','warmGray.900')}
              borderColor={useColorModeValue('grey.700','gray.500')}
              focusOutlineColor={useColorModeValue('black','white')}
              size="lg"
              invalidOutlineColor={'red.500'}
              h={12}
              onChangeText={(text) => setUsername(text)}
            />
          </Box>
          <Box alignItems="center">
            <Input 
              type={isPasswordVisible ? 'text' : 'password'} 
              isRequired
              variant={isPasswordVisible ? 'filled' : 'outline'}
              InputRightElement={passwordToggle()}
              InputLeftElement={InputLabel({label: 'Password'})}
              bgColor={useColorModeValue('warmGray.50','warmGray.900')}
              borderColor={useColorModeValue('grey.700','gray.500')}
              focusOutlineColor={useColorModeValue('black','white')}
              size="lg"
              invalidOutlineColor={'red.500'}
              h={12}
              onChangeText={(text) => setPassword(text)}
            />
          </Box>
          <Box alignItems={"center"}>
            <VStack alignContent={"center"}>
              <Pressable onPress={() => console.log('Forgot password pressed')}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={useColorModeValue('black', 'white')}
                  textAlign="center"
                >
                  Forgot password?
                </Text>
              </Pressable>
            <HStack 
              space={2} 
              alignItems="center" 
              justifyContent={'space-around'} 
              marginTop={10} 
              w={"70%"}>
               <Pressable onPress={() => console.log('Register Pressed')}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={useColorModeValue('black', 'white')}
                  textAlign="center"
                >
                  Register
                </Text>
              </Pressable>
                 <Pressable onPress={handleLogin}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={useColorModeValue('black', 'white')}
                  textAlign="center"
                >
                  Log In
                </Text>
              </Pressable>
            </HStack>
            </VStack>
          </Box>
        </VStack>
      </View>
      <ThemeToggle />
    </AnimatedColorBox>
  )
}