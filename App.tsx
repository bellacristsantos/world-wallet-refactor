import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { ArtistProvider } from './src/contexts/ArtistContext';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { THEME } from './src/theme'

import { Loading } from '@components/Loading';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { clearAllItems } from './storageAsync'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  // const clearAsyncStorage = async () => {
  //   await clearAllItems();
  //   console.log('Cache do AsyncStorage limpo com sucesso!');
  // };

  // // Chama a função de limpar o cache antes de renderizar o aplicativo
  // clearAsyncStorage();
  // // AsyncStorage.clear();

  return (
    <NativeBaseProvider theme={THEME}>
      <ArtistProvider>


        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading /> }


      </ArtistProvider>

    </NativeBaseProvider>
  );
}


