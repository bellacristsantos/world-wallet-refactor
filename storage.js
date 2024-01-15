const AsyncStorage =  require ('@react-native-async-storage/async-storage');

 const getData = async (key) => {
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

 const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Dados salvos no AsyncStorage com sucesso para a chave ${key}!`);
  } catch (error) {
    console.error('Erro ao salvar dados no AsyncStorage:', error);
  }
};

 const clearAllItems = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Todos os itens removidos do AsyncStorage.');
  } catch (error) {
    console.error('Erro ao limpar o AsyncStorage:', error);
  }
};

module.exports = {
  getData,
  storeData,
  clearAllItems
}