import React, { useEffect, useState } from 'react';
import { Image, VStack, HStack, Text, Box, Pressable, ScrollView, Center, SimpleGrid } from "native-base";
import CheckSvg from '@assets/check.svg';
import { useNavigation } from '@react-navigation/native';
import { getAllArtists } from '@services/spotifyService';
import { LongPressGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useArtistContext } from '@contexts/ArtistContext';

export function ArtistsGroup({ addSelectedArtist, clearSelectedArtists, ...rest }) {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigation();
  const { selectedArtists: globalSelectedArtists } = useArtistContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artists = await getAllArtists();
        console.log('All Artists:', artists);
        setTopArtists(artists || []);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setDataLoaded(true); // Marcar que os dados foram carregados, independente de terem sido carregados com sucesso ou não
      }
    };

    // Somente chama fetchData se os dados ainda não foram carregados
    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]); // Adiciona dataLoaded como dependência

  const handleLongPress = (artist) => {
    const isArtistSelected = selectedArtists.includes(artist);

    if (isArtistSelected) {
      // Desselecionar o item se já estiver selecionado
      setSelectedArtists((prevSelectedArtists) =>
        prevSelectedArtists.filter((a) => a !== artist)
      );
      clearSelectedArtists(artist);
    } else {
      // Selecionar o item se não estiver selecionado
      setSelectedArtists((prevSelectedArtists) => [...prevSelectedArtists, artist]);
      addSelectedArtist(artist);
    }
  };

  return (
    <ScrollView padding={9} showsVerticalScrollIndicator={false} centerContent>
      <SimpleGrid columns={{ base: 3, md: 1 }} spacing={2} >
        {topArtists.map((artist, index) => (
          <GestureHandlerRootView key={index}>
            <LongPressGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  handleLongPress(artist);
                }
              }}
              minDurationMs={2}
            >
              <Pressable
                padding={1}
                marginTop={16}
                width={120}
                onPress={() => {
                  navigation.navigate('artists_list');
                  // getArtistData(artist?.id);
                }}
                overflow="hidden"
                {...rest}
              >
                <HStack>
                  <Box position="relative">
                    <Image
                      source={{ uri: artist?.image }}
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: 1000,
                        overflow: "hidden",
                        opacity: globalSelectedArtists.includes(artist) ? 0.2 : 1,
                      }}
                      resizeMode="cover"
                      alt={`Image for ${artist?.name}`}
                    />
                    {globalSelectedArtists.includes(artist) && (
                      <Center
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                      >
                        <CheckSvg color="white" marginTop={-30} />
                      </Center>
                    )}
                    <Center>
                      <Text
                        color="gray.200"
                        fontSize="xs"
                        fontWeight="bold"
                        textAlign="center"
                        marginTop={4}
                      >
                        {artist?.name}
                      </Text>
                    </Center>
                  </Box>
                </HStack>
              </Pressable>
            </LongPressGestureHandler>
          </GestureHandlerRootView>
        ))}
      </SimpleGrid>
    </ScrollView>
  );
}
