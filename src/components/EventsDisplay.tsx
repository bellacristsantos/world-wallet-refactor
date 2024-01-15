import React, { useEffect, useState } from "react";
import { Image, VStack, Text, Box, HStack, ScrollView, Center, Pressable } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { getEvents } from '@services/ticketmasterService';


export function EventsDisplay() {
  const navigation = useNavigation();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getEvents();
        setEventsData(events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {eventsData.map((event, index) => (
        <Pressable
          key={index}
          onPress={() => {
            navigation.navigate('event_details');
          }}
        >
          <HStack key={index}>
            <VStack margin={2} width={250} alignItems="center" mt={4}>
              <Box position="relative">
                <Image
                  source={{ uri: event.image }}
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                  resizeMode="cover"
                  alt={`Event Image ${index}`}
                />
                <Box position="absolute" width={60} height={60} top={2} right={2} p={2} bg="rgba(255, 253, 253, 0.8)" borderRadius={6} alignItems='center'>
                  <Text color="gray.700" fontSize="lg" fontWeight='bold'>{event.day}</Text>
                  <Text color="gray.700" fontSize="xs">{event.month}</Text>
                </Box>
                <Box position="absolute" bottom={0} left={0} p={2} width="100%">
                  <Text color="gray.200" fontSize="sm" textAlign="left" >{event.eventType}</Text>
                  <Text color="gray.100" fontSize="lg" textAlign="left" fontWeight="bold">{event.eventName}</Text>
                </Box>
              </Box>
            </VStack>
          </HStack>
        </Pressable>
      ))}
    </ScrollView>
  );
}
