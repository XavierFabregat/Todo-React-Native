import React from 'react';
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  Image,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import NavBar from '../components/navbar';
import Masthead from '../components/masthead';
import LinkButton from '../components/link-button';

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
            <Text fontSize="md" w="full">
            This is a React Native tutorial built in the YouTube channel called
            DevAsLife.
          </Text>
          <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com/devaslife"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to YouTube channel
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="full"
            href="https://twitter.com/inkdrop_app"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            @inkdrop_app
          </LinkButton>
          <Text fontSize="md" w="full">
            Are you looking for a Markdown note-taking app? Check out my app
            called Inkdrop!
          </Text>
          <LinkButton
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            href="https://www.inkdrop.app/"
            leftIcon={
              <Icon as={Feather} name="external-link" size="sm" opacity={0.5} />
            }
          >
            https://www.inkdrop.app/
          </LinkButton>
          </Box>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}