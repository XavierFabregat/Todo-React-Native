import React from 'react';
import {
  ScrollView,
  Box,
  VStack,
  useColorModeValue,
  Image,
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import NavBar from '../components/navbar';
import Masthead from '../components/masthead';
import RemoveTestComponent from '../redux/remove-test-component';

export default function AboutScreen () {
  return (
    <AnimatedColorBox 
      flex={1} 
      bg={useColorModeValue('warmGray.50','warmGray.900')}
      w="full"
    >
      <Masthead title="About this app" image={require('../assets/about-masthead.png')}>
        <NavBar />
      </Masthead>
      <ScrollView
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
            <Image 
              source={require('../assets/profile-pic.png')} 
              borderRadius="full"
              resizeMode='cover'
              w={120}
              h={120}
              alt="Profile picture"
            />
            <RemoveTestComponent />
          </Box>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}