import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AppHeader() {
  return (
    <View className="flex-row items-center gap-2 px-6 pb-4">
      <AntDesign name="open-ai" size={30} color="black" />
      <Text className="font-poppins-bold text-2xl">AI Streamer</Text>
    </View>
  );
}
