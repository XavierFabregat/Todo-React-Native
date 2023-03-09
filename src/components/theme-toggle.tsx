import React from 'react';
import { Text, HStack, Switch, useColorMode, Pressable, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface Props {
  mode?: string;
}

export default function ThemeToggle({ mode = "toggle" }) {

  const { colorMode, toggleColorMode } = useColorMode();

  return mode === "toggle" ? (
    <>
    <HStack space={2} alignItems="center">
      <Icon as={<Feather name={"moon"}/>} size="lg" color={colorMode === "light" ? 'black' : 'white'} />
      <Switch isChecked={colorMode === 'light'}  onToggle={toggleColorMode}/>
      <Icon as={<Feather name={"sun"}/>} size="lg" color={colorMode === "light" ? 'black' : 'white'} />
    </HStack>
    </>
  ) : (
    <>
    <HStack space={2} alignItems="center">
      <Pressable onPress={toggleColorMode}>
          <Icon as={<Feather name={colorMode === 'light' ? 'moon' : 'sun'}  />} size="lg" color={colorMode === "light" ? 'black' : 'white'} />
      </Pressable>
    </HStack>
    </>
  )
}
