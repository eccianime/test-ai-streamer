import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useChatStore } from '@/store/useChatStore';

export default function AppHeader() {
  const { resetChat } = useChatStore();
  return (
    <View className="flex-row items-center justify-between px-6 pb-4">
      <View className="flex-row gap-2">
        <AntDesign name="open-ai" size={30} color="black" />
        <Text className="font-poppins-bold text-2xl">AI Streamer</Text>
      </View>
      <TouchableOpacity onPress={resetChat}>
        <Ionicons name="arrow-up-right-box-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
