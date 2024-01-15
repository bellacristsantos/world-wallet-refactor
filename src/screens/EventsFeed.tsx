import React, { useEffect, useState } from 'react';
import { Image, Text, Box, VStack, Input, Icon, Center, Button, ScrollView } from 'native-base';
import Search from '@assets/search.svg';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
} from 'expo-location';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Loading } from '@components/Loading';
import { getAddressLocation } from '@utils/getAddressLocation';

import { ArtistsFeed } from '@components/ArtistsFeed';
import { EventsDisplay } from '@components/EventsDisplay';
import { UpcomingEvents } from '@components/UpcomingEvents';


export function EventsFeed() {
  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission]);

  const handleSearch = async () => {
    const location = await getAddressLocation({ latitude: 0, longitude: 0 });
    if (location) {
      await AsyncStorage.setItem('selectedLocation', JSON.stringify(location));
      setSelectedCity(inputValue);
      setInputValue('');
    }

    navigation.navigate('region');

  };

  if (!locationForegroundPermission?.granted) {
    return (
      <Text color="gray.100" fontSize="lg" textAlign="center" margin={24}>
        To discover all upcoming music events, allow location access. Head to your device settings and grant Luster permission to access your location.
      </Text>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  // const handleEventPress = (eventsData) => {
  //   // Navegar para a tela de detalhes do evento, passando os dados do evento
  //   navigation.navigate('event_details', { eventsData });
  // };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" px={22}>

        <Text color="gray.100" fontSize="sm" fontWeight={400} mt={20}>
          Your Location
        </Text>

        {selectedCity ? (
          <Center>
            <Text color="gray.100" fontSize="xl">
              {selectedCity}
            </Text>
          </Center>
        ) : (
          <Text color="gray.100" fontSize="lg" fontWeight={700}>
            {currentAddress}
          </Text>
        )}

        <Input
          px={2}
          h={14}
          mt={4}
          borderRadius={8}
          backgroundColor="transparent"
          borderWidth={0.4}
          fontSize="xs"
          fontFamily="body"
          placeholder="Search"
          color="gray.100"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          _focus={{
            borderWidth: 1,
            borderColor: 'purple.900',
          }}
          onSubmitEditing={handleSearch}
          InputRightElement={
            <Box mr={2} mt={1.8}>
              <Icon as={<Search />} onPress={handleSearch} />
            </Box>
          }
        />

        <ArtistsFeed />

        <Text color="gray.100" fontSize="lg" fontWeight={700} marginTop={2}>
          FEATURED
        </Text>

        <EventsDisplay  />


        <Text color="gray.100" fontSize="lg" fontWeight={700} marginTop={4}>
          MORE EVENTS
        </Text>

          <UpcomingEvents  />

      </VStack>
    </ScrollView>
  );
}
