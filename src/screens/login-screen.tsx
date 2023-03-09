import React from 'react';
import {
  View,
  Box,
  VStack,
  useColorModeValue,
  Input,
  HStack,
  Text,
  Icon,
  Pressable,
  KeyboardAvoidingView,
  Center
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Masthead from '../components/masthead';
import ThemeToggle from '../components/theme-toggle';
import { Entypo } from '@expo/vector-icons';
import type { User } from '../Types';
import shortid from 'shortid';
import { useAppDispatch } from '../hooks/redux.hooks';
import { setUser } from '../redux/user.slice';
import { Platform } from 'react-native';
import { loginValidation } from '../Lib/loginValidation';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import { InputLabel } from '../components/input-lable';
import LoginForm from '../components/login-form';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function LoginScreen () {

  const dispatch = useAppDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isUserValid, setIsUserValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const inputOffSet = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.sin(inputOffSet.value * Math.PI) * 10}]
  }), [inputOffSet]);

  const shake = () => {
    inputOffSet.value = withRepeat(withTiming(1, {duration: 100}), 5, false, () => {
      inputOffSet.value = 0;
    });
  };

  function handleLogin () {
    // send username and password to backend and get user object
    if (!password || !username) {
      return;
    }
    const [passwordValidation, userValidation] = loginValidation(username, password);
    console.log(userValidation, passwordValidation)
    setIsUserValid(userValidation);
    setIsPasswordValid(passwordValidation);

    if (!userValidation || !passwordValidation) {
      shake();
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

  


  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.200','darkBlue.600')}
      w="full"
    >
      <Masthead 
        titleColor={useColorModeValue('white','black')}
        title="" 
        image={require('../assets/login-masthead.png')}
      >
      </Masthead>
      <View
        justifyContent={"center"}
        flex={1} 
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50','primary.900')}
        mt={"-20px"}
        p={4}
      >
        <Center>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Welcome Back!
          </Text>
        </Center>
        <LoginForm />
        <Box alignItems={"flex-end"} w="full" p={5}>
          <ThemeToggle mode='icons'/>
        </Box>
      </View>
    </AnimatedColorBox>
  )
}