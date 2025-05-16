import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async getItem(key: string) {
    const data = await AsyncStorage.getItem(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  },
  async setItem(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
  async clearAll() {
    await AsyncStorage.clear();
  },
};

export default storage;
