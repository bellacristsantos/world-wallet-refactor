import React, { useState } from 'react';
import { ScrollView, VStack, Button } from 'native-base';
import Check from '@assets/check.svg';
import { ArtistsGroup } from '@components/ArtistsGroup';
import { useNavigation } from '@react-navigation/native';
import { useArtistContext } from '@contexts/ArtistContext';

export function ArtistsList() {
  const navigation = useNavigation();
  const { selectedArtists, addSelectedArtist, clearSelectedArtists } = useArtistContext();
  const [isInFavoritesScreen, setIsInFavoritesScreen] = useState(false);

  const handleNavigateToFavorites = () => {
    setIsInFavoritesScreen(true);
    // clearSelectedArtists(false);
    navigation.navigate('favorites_artists_list');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <ArtistsGroup
          addSelectedArtist={addSelectedArtist}
          clearSelectedArtists={clearSelectedArtists}
          isInFavoritesScreen={isInFavoritesScreen}
        />
       
        <Check
          position="absolute"
          top={45}
          right={16}
          width={38}
          height={38}
          onPress={handleNavigateToFavorites}
        />
      </VStack>
    </ScrollView>
  );
}
