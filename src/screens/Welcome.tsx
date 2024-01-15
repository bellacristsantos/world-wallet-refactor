import React, { useEffect } from 'react';

import { VStack, HStack, Image, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/Background.png'


export function Welcome() {

  const navigation = useNavigation();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.navigate('region');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (

    <VStack flex={1} bg="gray.700">

      <Image
        source={BackgroundImg}
        alt="Music Event Image"
        maxW={428}
        maxH={624}
        resizeMode="cover"
        position="absolute"
      />

      <HStack flex={1} space={2}
      alignItems="center" justifyContent="center">

        <LogoSvg />

        <Text color='gray.100' fontSize='xl' fontWeight={700}>
          Luster
        </Text>

      </HStack>


    </VStack>
  );
}