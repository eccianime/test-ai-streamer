import { Message } from '@/store/types';
import { memo } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.role === 'user';

  return (
    <View
      className={`my-1 w-3/4 rounded-2xl px-4 py-2 ${isUser ? 'self-end bg-user-box' : 'bg-ai-box'}`}
    >
      <Markdown
        style={{
          body: { fontFamily: 'Poppins-Regular', fontSize: 14 },
          link: { color: '#1e90ff' },
          heading1: { fontSize: 22 },
        }}
      >
        {message.content}
      </Markdown>
    </View>
  );
};

export default memo(MessageItem);

MessageItem.displayName = 'MessageItem';
