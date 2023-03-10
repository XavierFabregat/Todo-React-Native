import React, { useState } from 'react';
import { Box, Input, Center, useColorModeValue, KeyboardAvoidingView, Pressable, HStack, Icon, VStack, Text, ScrollView } from 'native-base';
import Animated,{ useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useAppDispatch } from '../hooks/redux.hooks';
import { InputLabel } from './input-lable';
import { Entypo } from '@expo/vector-icons';
import { User } from '../Types';
import shortid from 'shortid';
import { setUser } from '../redux/user.slice';
import { loginValidation } from '../Lib/loginValidation';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

const AnimatedBox = Animated.createAnimatedComponent(Box);

type StackParamList = {
  Login: undefined;
  Register: undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>


export default function LoginForm () {

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);


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

  const inputOffSet = useSharedValue(0);


  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.sin(inputOffSet.value * Math.PI) * 10}]
  }), [inputOffSet]);

  const shake = () => {
    const easing = Easing.bezier(0.25, 0.1, 0.25, 1);
    inputOffSet.value = withRepeat(withTiming(1, {duration: 100, easing}), 5, false, () => {
      inputOffSet.value = 0;
    });
  };

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
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
        flex={1}
        height="100%"
      >
        <AnimatedBox style={[shakeStyle]} alignItems="center" paddingY={10}>
          <Input 
            type='text'
            isRequired
            onFocus={() => {
              setIsUserValid(true);
              setIsPasswordValid(true);
            }}
            isInvalid={!isUserValid}
            variant={isPasswordVisible ? 'filled' : 'outline'}
            InputLeftElement={InputLabel({label: 'Username'})}
            bgColor={useColorModeValue('warmGray.50','warmGray.900')}
            borderColor={useColorModeValue('grey.700','gray.500')}
            focusOutlineColor={useColorModeValue('black','white')}
            selectionColor={useColorModeValue('black','white')}
            size="lg"
            invalidOutlineColor={'red.500'}
            h={12}
            onChangeText={(text) => setUsername(text)}
          />
        </AnimatedBox>
        <AnimatedBox alignItems="center" style={[shakeStyle]}>
          <Input 
            onFocus={() => {
              setIsPasswordValid(true);
              setIsUserValid(true);
            }}
            type={isPasswordVisible ? 'text' : 'password'} 
            isRequired
            isInvalid={!isPasswordValid}
            variant={isPasswordVisible ? 'filled' : 'outline'}
            InputRightElement={passwordToggle()}
            InputLeftElement={InputLabel({label: 'Password'})}
            bgColor={useColorModeValue('warmGray.50','warmGray.900')}
            borderColor={useColorModeValue('grey.700','gray.500')}
            focusOutlineColor={useColorModeValue('black','white')}
            selectionColor={useColorModeValue('black','white')}
            size="lg"
            invalidOutlineColor={'red.500'}
            h={12}
            onChangeText={(text) => setPassword(text)}
          />
        </AnimatedBox>  
           <Center h={"1/6"}>
            {(!isPasswordValid || !isUserValid) &&(
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={'red.500'}
              >Invalid user/password</Text>
            )}
          </Center>
          <Box alignItems={"center"} >        
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
          </Box>
     
      <VStack alignItems={"center"} justifyContent={"center"} flex={0.5}>
       <HStack 
          space={2} 
          alignItems="center" 
          justifyContent={'space-between'} 
          marginTop={10} 
          w={"100%"}
        >
          <Box bg={useColorModeValue('blue.300', 'purple.700')} width={"40%"} height={"150%"} borderRadius={5} alignItems="center" justifyContent={"center"}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={useColorModeValue('black', 'white')}
                textAlign="center"
              >
                Register
              </Text>
            </Pressable>
          </Box>
          <Box bg={useColorModeValue('blue.300', 'purple.700')} width={"40%"} height={"150%"} borderRadius={5} alignItems="center" justifyContent={"center"}>
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
          </Box>
        </HStack>
      </VStack> 
      </KeyboardAvoidingView>  
    </> 
  )
}