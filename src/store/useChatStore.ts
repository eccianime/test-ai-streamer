import { create } from 'zustand';
import { ChatState } from './types';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  streamingId: null,
  isStreaming: false,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  appendToken: (id, token) =>
    set((state) => {
      const index = state.messages.findIndex((m) => m.id === id);
      if (index === -1) return state;

      const newMessages = [...state.messages];
      const oldMsg = newMessages[index];

      newMessages[index] = {
        ...oldMsg,
        content: oldMsg.content + token,
      };

      return { messages: newMessages };
    }),

  startStream: (id) =>
    set({
      streamingId: id,
      isStreaming: true,
    }),

  stopStream: () =>
    set({
      streamingId: null,
      isStreaming: false,
    }),

  resetChat: () =>
    set({
      messages: [],
      streamingId: null,
      isStreaming: false,
    }),
}));
