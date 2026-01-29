import { Message } from '@/store/types';
import { useChatStore } from '@/store/useChatStore';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';

export default function ChatScreen() {
  const messages = useChatStore((s) => s.messages);

  const listRef = useRef<FlashListRef<Message>>(null);
  const isNearBottom = useRef(true);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const padding = 40;

    isNearBottom.current =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - padding;
  }, []);

  const lastMessageContent = useChatStore((s) => s.messages[s.messages.length - 1]?.content);

  useEffect(() => {
    if (!isNearBottom.current) return;
    listRef.current?.scrollToEnd({ animated: false });
  }, [lastMessageContent]);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <MessageItem message={item} />;
  }, []);

  return (
    <FlashList
      ref={listRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ padding: 12 }}
    />
  );
}

// ---------- MESSAGE ITEM (AISLADO) ----------
const MessageItem = React.memo(({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#007AFF' : '#e5e5ea',
        padding: 10,
        borderRadius: 12,
        marginVertical: 4,
        maxWidth: '80%',
      }}
    >
      <Text style={{ color: isUser ? 'white' : 'black' }}>{message.content}</Text>
    </View>
  );
});
