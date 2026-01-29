import { useChatStore } from '@/store/useChatStore';

let cancelCurrentStream: (() => void) | null = null;

export function startMockStream(fullText: string, messageId: string) {
  const tokens = fullText.split(/(\s+)/);
  let index = 0;
  let cancelled = false;

  cancelCurrentStream = () => {
    cancelled = true;
    useChatStore.getState().stopStream();
  };

  const tick = () => {
    if (cancelled) return;

    const { appendToken, stopStream } = useChatStore.getState();

    if (index >= tokens.length) {
      stopStream();
      return;
    }

    appendToken(messageId, tokens[index]);
    index++;

    setTimeout(tick, 30);
  };

  tick();
}

export function stopMockStream() {
  cancelCurrentStream?.();
}

export function isStreamRunning() {
  return useChatStore.getState().isStreaming;
}
