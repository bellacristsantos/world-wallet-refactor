import React, { useEffect, useState } from 'react';
import { Image, VStack, Text, Box, Pressable, HStack, ScrollView, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { getTopArtists } from '@services/spotifyService';



export function ArtistsFeed({ ...rest }) {
  const [topArtists, setTopArtists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artists = await getTopArtists();
        console.log('Top Artists:', artists);
        setTopArtists(artists || []);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Rendering ArtistsFeed Component');


  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack>
        {topArtists.map((artist, index) => (
          <Pressable
            key={index}
            margin={2}
            width={20}
            alignItems='center'
            onPress={() => {
              navigation.navigate('artists_list');
              // getArtistData(artist?.id);
            }}
            overflow="hidden"
            marginTop={14}
            {...rest}
          >
            <Box mb={2}>
              <Image
                source={{ uri: artist?.image }}
                style={{
                  height: 63,
                  width: 63,
                  borderRadius: 1000,
                  overflow: "hidden",
                }}
                resizeMode="cover"
                alt={`Image for ${artist?.name}`}
              />
              <Center>
                <Text
                  color="gray.200"
                  fontSize="xs"
                  fontWeight="bold"
                  textAlign="center"
                  marginTop={1}
                >
                  {artist?.name}
                </Text>
              </Center>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
}
