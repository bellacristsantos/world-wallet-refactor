import React, { createContext, useContext, useState, useEffect } from 'react';

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [favoriteArtistsNames, setFavoriteArtistsNames] = useState([]);

  const addSelectedArtist = (artist) => {
    setSelectedArtists([...selectedArtists, artist]);
  };

  const removeSelectedArtist = (artist) => {
    setSelectedArtists(selectedArtists.filter((a) => a.id !== artist.id));
  };

  const clearSelectedArtists = (clear = true) => {
    setSelectedArtists(clear ? [] : selectedArtists);
  };

  useEffect(() => {
    const names = selectedArtists.map((artist) => artist.name);
    setFavoriteArtistsNames(names);
  }, [selectedArtists]);

  return (
    <ArtistContext.Provider
      value={{
        selectedArtists,
        addSelectedArtist,
        removeSelectedArtist,
        clearSelectedArtists,
        favoriteArtistsNames,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => {
  return useContext(ArtistContext);
};
