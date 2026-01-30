import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function EmptyView() {
  return (
    <View className="flex-1 items-center justify-center">
      <AntDesign name="open-ai" size={80} color="black" />
      <View className="mt-6 gap-2">
        <Text className="font-poppins-bold text-2xl">Aplicativo AI Streamer</Text>
        <Text className="text-center font-poppins-regular text-lg">
          {`Escribe tu pregunta y obtén\nresultados aleatórios.`}
        </Text>
      </View>
    </View>
  );
}
