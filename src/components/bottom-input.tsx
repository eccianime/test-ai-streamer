import { colors } from '@/config/colors';
import { MOCK_RESPONSE } from '@/mock/mock-response';
import { Message } from '@/store/types';
import { useChatStore } from '@/store/useChatStore';
import { uuidv4 } from '@/utils/crypto';
import { startMockStream, stopMockStream } from '@/utils/stream-engine';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function BottomInput() {
  const [text, setText] = useState('');
  const isStreaming = useChatStore((s) => s.isStreaming);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;

    const store = useChatStore.getState();

    if (store.isStreaming) stopMockStream();

    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      content: text,
    };

    store.addMessage(userMsg);

    const botId = uuidv4();

    store.addMessage({
      id: botId,
      role: 'assistant',
      content: '',
    });

    store.startStream(botId);
    startMockStream(MOCK_RESPONSE, botId);

    setText('');
  }, [text]);

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
        onPress={() => {
          if (isStreaming) {
            stopMockStream();
          } else {
            handleSend();
          }
        }}
        className={`${isStreaming ? 'bg-red-500' : 'bg-primary'} h-14 w-14 items-center justify-center rounded-2xl ${
          !text.trim() && !isStreaming && 'opacity-50'
        }`}
      >
        <Ionicons name={isStreaming ? 'stop' : 'send'} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
