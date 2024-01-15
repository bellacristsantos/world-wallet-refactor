import AsyncStorage from '@react-native-async-storage/async-storage';

 export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Conteúdo do AsyncStorage para a chave ${key}:`, value);
      return value;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter dados do AsyncStorage:', error);
    return null;
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Dados salvos no AsyncStorage com sucesso para a chave ${key}!`);
  } catch (error) {
    console.error('Erro ao salvar dados no AsyncStorage:', error);
  }
};

export const clearAllItems = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Todos os itens removidos do AsyncStorage.');
  } catch (error) {
    console.error('Erro ao limpar o AsyncStorage:', error);
  }
};

