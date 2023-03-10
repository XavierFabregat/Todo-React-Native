import React from 'react';
import {
  View,
  Box,
  useColorModeValue,
  Text,
  Center
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Masthead from '../components/masthead';
import ThemeToggle from '../components/theme-toggle';

import LoginForm from '../components/login-form';

export default function LoginScreen () {

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.200','darkBlue.600')}
      w="full"
    >
      <Masthead 
        titleColor={useColorModeValue('white','white')}
        title="Welcome Back!" 
        image={require('../assets/login-masthead.png')}
      >
      </Masthead>
      <View
        justifyContent={"center"}
        flex={1} 
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50','darkBlue.800')}
        mt={"-20px"}
        p={4}
      >
        <LoginForm />
        <Box alignItems={"flex-end"} w="full" p={5}>
          <ThemeToggle mode='icons'/>
        </Box>
      </View>
    </AnimatedColorBox>
  )
}