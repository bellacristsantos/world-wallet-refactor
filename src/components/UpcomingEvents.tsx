import React, { useEffect, useState } from "react";
import { Image, Text, VStack, Box, HStack, ScrollView, Pressable } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import LocationSvg from "@assets/location.svg";
import ArrowSvg from '@assets/arrow.svg';
import { useNavigation } from '@react-navigation/native';
import { getUpcomingEvents } from '@services/ticketmasterService';


export function UpcomingEvents() {
  const navigation = useNavigation();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getUpcomingEvents();

      // Ordenar os eventos pelo campo 'day' e 'month' de forma ascendente
      events.sort((a, b) => {
        const dateA = new Date(`${a.month} ${a.day}`);
        const dateB = new Date(`${b.month} ${b.day}`);
        return dateA - dateB;
      });

      setEventsData(events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} >
      <Pressable
         onPress={() => {
          navigation.navigate('event_details');
        }}
      >
        <VStack mt={4}>
          {eventsData.map((event, index) => (
            <Box borderRadius={2}>
              <LinearGradient
                key={index}
                colors={['#6D50A0', '#E983F7', '#EC84F9', '#F687FF']}
                locations={[0, 0.85, 0.5, 1]}
                start={[0, 0]}
                end={[1, 0]}
                width={390}
                height={150}
                mb={4}
                marginLeft={3}
                marginRight={3}
                marginBottom={16}
                borderRadius={6}
              >
                <HStack space={4} width="100%" alignItems="center" px={4} py={1}>
                  <Box height={95} width={75}borderRadius={8} overflow="hidden" marginTop={6}>
                    <Image
                      source={{uri: event.image}}
                      style={{
                        flex: 1,
                        width: null,
                        height: null,
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                      resizeMode="cover"
                      alt={`Event Image ${index}`}
                    />
                  </Box>
                  <VStack alignItems="flex-start" flex={1} >
                    <Text color='gray.100' fontSize="md" fontWeight="bold" textAlign="left" lineHeight={20} mt={4}>
                      {event.day}
                    </Text>
                    <Text color='gray.100' fontSize="sm" textAlign="left" mt={1} >
                      {event.month}
                    </Text>
                    <Box >
                      <Text color='gray.100' fontSize="sm" fontWeight="bold" textAlign="left" mt={1} mr={8}>
                        {event.eventName}
                      </Text>
                    </Box>
                    <HStack space={1} alignItems="center" justifyContent="center" marginRight={4} marginTop={1}>
                      <LocationSvg width={10} height={10} fill="white" />
                      <Text color='#F9FAFC' fontSize="xs" textAlign="left" >
                        {`${event.venue}, ${event.city} - ${event.country}`}
                      </Text>
                    </HStack>
                    <ArrowSvg width={24} height={24} fill="#FFFFFF" position="absolute" top={62} right={18} />
                  </VStack>
                </HStack>
              </LinearGradient>
            </Box>
          ))}
        </VStack>
      </Pressable>
    </ScrollView>
  );
}
