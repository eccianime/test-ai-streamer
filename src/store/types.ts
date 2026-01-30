type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatState = {
  messages: Message[];
  streamingId: string | null;
  isStreaming: boolean;

  addMessage: (msg: Message) => void;
  appendToken: (id: string, token: string) => void;
  startStream: (id: string) => void;
  stopStream: () => void;
  resetChat: () => void;
};

export type { Message, ChatState };
