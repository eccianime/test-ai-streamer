import { Message } from '@/store/types';
import { useChatStore } from '@/store/useChatStore';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import MessageItem from './message-item';
import EmptyView from './empty-view';

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

  if (messages.length === 0) {
    return <EmptyView />;
  }

  return (
    <FlashList
      ref={listRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerClassName={`p-3`}
    />
  );
}
