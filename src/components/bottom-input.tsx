import { colors } from '@/config/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function BottomInput() {
  const [text, setText] = useState('');
  return (
    <View className="android:pb-safe flex-row gap-3 border-t border-t-gray-200 bg-white p-6">
      <TextInput
        className="border-border font-poppins-regular min-h-14 flex-1 justify-center rounded-2xl border-2 bg-white px-6 text-sm text-gray-700"
        placeholder="Pregúntame lo que quieras"
        placeholderTextColor={colors.placeholder}
        value={text}
        onChangeText={setText}
        autoCorrect={false}
      />
      <TouchableOpacity
        className={`bg-primary h-14 w-14 items-center justify-center rounded-2xl ${
          !text.trim() && 'opacity-50'
        }`}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
