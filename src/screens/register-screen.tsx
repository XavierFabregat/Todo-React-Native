import React, { useEffect, useState } from "react";
import { Text, useColorModeValue, View, Box, Input, HStack, Icon, Pressable, Center, KeyboardAvoidingView } from "native-base";
import { InputLabel } from "../components/input-lable";
import AnimatedColorBox from "../components/animated-color-box";
import Masthead from "../components/masthead";
import Animated, { useSharedValue, useAnimatedStyle, Easing, withRepeat, withTiming} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { loginValidation } from "../Lib/loginValidation";
import { Platform } from "react-native";
import shortid from "shortid";
import { User } from "../Types";
import { useAppDispatch } from "../hooks/redux.hooks";
import { setUser } from "../redux/user.slice";

const AnimatedBox = Animated.createAnimatedComponent(Box);


export default function RegisterScreen () {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const dispatch = useAppDispatch();

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

  function registerFormSubmit () {
    if (!password || !username || !passwordRepeat) {
      return;
    }
    const [passwordValidation, userValidation] = loginValidation(username, [password, passwordRepeat]);

    if (!passwordValidation.valid) {
      if (passwordValidation.message === 'Passwords do not match') {
        setDoPasswordsMatch(false);
        if (!userValidation) {
          setIsUserValid(false);
        }
        shake();
        return;
      } else {
        setIsPasswordValid(false);
        if (!userValidation) {
          setIsUserValid(false);
        }
        shake();
        return;
      }
    }

    if (!userValidation) {
      setIsUserValid(false);
      shake();
      return;
    }

    // if user is valid, send to backend
    // Now I'm going to use a mock user to test the app

    const mockUser: User = {
      id : shortid.generate(),
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      todos: [],
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    }

    dispatch(setUser(mockUser));

  }



  return (
    <AnimatedColorBox 
      flex={1}
      bg={useColorModeValue('warmGray.200','darkBlue.800')}
      w="full"
    >
       <Masthead 
        titleColor={useColorModeValue('white','white')}
        title="Welcome!" 
        image={require('../assets/register-masthead.png')}
      >
      </Masthead>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        justifyContent={"space-evenly"}
        flex={1} 
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50','darkBlue.800')}
        mt={"-20px"}
        p={4}
        w="full"
        height={"4/6"}
      >
        <View>
        <AnimatedBox style={[shakeStyle]} alignItems="center">
          <Input 
            type='text'
            isRequired
            isInvalid={!isUserValid}
            onFocus={() => {
              setIsUserValid(true);
              setIsInputFocused(true);
            }}
            onBlur={() => setIsInputFocused(false)}
            InputLeftElement={InputLabel({label: 'Username'})}
            bgColor={useColorModeValue('warmGray.50','warmGray.900')}
            borderColor={useColorModeValue('grey.700','gray.500')}
            focusOutlineColor={useColorModeValue('black','white')}
            selectionColor={useColorModeValue('black','white')}
            size="lg"
            invalidOutlineColor={'red.500'}
            onChangeText={text => setUsername(text)}
            h={12}
          />
        </AnimatedBox>
        <Center mt={5}>
          {!isUserValid && <Text 
            textAlign={"center"}
            fontWeight={"bold"}
            color={useColorModeValue('red.500','red.500')}
          >Usernames must have 5 or more characters.</Text>}
        </Center>
        </View>
        <View >
        <AnimatedBox alignItems="center" style={[shakeStyle]} mb={10}>
          <Input 
            type={isPasswordVisible ? 'text' : 'password'} 
            isRequired
            onFocus={() => {
              setDoPasswordsMatch(true)
              setIsPasswordValid(true)
              setIsInputFocused(true);
            }}
            onBlur={() => setIsInputFocused(false)}
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
            onChangeText={text => setPassword(text)}
          />
        </AnimatedBox> 
        <AnimatedBox alignItems="center" style={[shakeStyle]}>
          <Input 
            type={isPasswordVisible ? 'text' : 'password'} 
            isRequired
            onFocus={() => {
              setDoPasswordsMatch(true);
              setIsPasswordValid(true);
              setIsInputFocused(true);
            }}
            onBlur={() => setIsInputFocused(false)}
            isInvalid={!doPasswordsMatch}
            variant={isPasswordVisible ? 'filled' : 'outline'}
            InputLeftElement={InputLabel({label: 'Repeat Password'})}
            bgColor={useColorModeValue('warmGray.50','warmGray.900')}
            borderColor={useColorModeValue('grey.700','gray.500')}
            focusOutlineColor={useColorModeValue('black','white')}
            selectionColor={useColorModeValue('black','white')}
            size="lg"
            invalidOutlineColor={'red.500'}
            h={12}
            onChangeText={text => setPasswordRepeat(text)}
          />
        </AnimatedBox>
        <Center mt={5}>
          {!isPasswordValid && <Text 
            textAlign={"center"}
            fontWeight={"bold"}
            color={useColorModeValue('red.500','red.500')}
          >Passwords must be at least 6 characters and contain a special character.</Text>}
          {!doPasswordsMatch && <Text
           textAlign={"center"}
           fontWeight={"bold"}
           color={useColorModeValue('red.500','red.500')}
          >Your passwords don't match.</Text>}
        </Center>
        </View>
        {!isInputFocused && (<Box 
          alignSelf={"flex-end"} 
          p={5} 
          bg={useColorModeValue('blue.300', 'purple.700')} 
          w="40%"
          borderRadius="5px"
          alignItems={"center"}
          mb={10}
          mr={10}
          >
          <Pressable onPress={registerFormSubmit}>
            <Text>
              Register
            </Text>
          </Pressable>
        </Box>)}
        </KeyboardAvoidingView>
    </AnimatedColorBox>
  )
}