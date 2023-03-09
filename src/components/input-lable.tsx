import React from "react"
import { View, Text } from "native-base";
import { useColorModeValue } from "native-base";

export function InputLabel ({label} : {label: string}) {
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