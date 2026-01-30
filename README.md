# AI Streamer

A single-screen chat interface that simulates an AI assistant streaming responses in real time. Built with Expo (React Native) and TypeScript. Focused on streaming state updates, list performance, and clean architecture.

## Demo MP4

[Demo](https://github.com/eccianime/test-ai-streamer/blob/main/demo.mp4)

# Features

- **Mock streaming engine**: Word-by-word streaming with slight delays.
- **Fast message list**: Uses Shopify FlashList for high-performance rendering.
- **Smart auto-scroll**: Stays at bottom while streaming unless the user scrolls up.
- **Markdown support**: Renders basic markdown in AI messages as content streams.
- **Stop generation**: Cancel the stream mid-sentence.
- **Solid UX**: Keyboard-safe layout, clean UI, and empty state.

# Tech Stack

- **Expo / React Native**: Expo SDK 54
- **Language**: TypeScript
- **State**: Zustand
- **List**: @shopify/flash-list
- **Styling**: NativeWind (Tailwind-like classes)
- **Markdown**: react-native-markdown-display
- **Router/Fonts**: expo-router, @expo-google-fonts/poppins

# Getting Started

## Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Xcode) or Android Emulator (Android Studio), or a real device with Expo Go / Dev Client

## Install

```bash
# clone this repo
git clone https://github.com/eccianime/test-ai-streamer
cd ai-stream

# install dependencies
npm install
# or
yarn
# or
pnpm install
```

## Run

```bash
# start dev server
npm run start
# open iOS
npm run ios
# open Android
npm run android
# or web (limited)
npm run web
```

If using a physical device, scan the QR from the terminal/app with Expo Go or your Dev Client.

# How It Works

## Architecture Overview

- **Streaming logic (decoupled)**: The streaming mechanism lives in `src/utils/stream-engine.ts`. UI components never manage timers directly.
- **Global state**: `zustand` store in `src/store/useChatStore.ts` holds messages and streaming state (`streamingId`, `isStreaming`), with actions to add messages, append tokens, start/stop stream, and reset.
- **UI composition**:
  - `src/app/index.tsx`: Keyboard-safe screen wrapper and composition of header, chat list, and input.
  - `src/components/chat-screen.tsx`: FlashList for messages, auto-scroll logic, and empty state.
  - `src/components/message-item.tsx`: Memoized message bubble rendering markdown.
  - `src/components/bottom-input.tsx`: Input, send/stop button, and flow control.

## The Mock Stream Engine

- File: `src/utils/stream-engine.ts`
- Approach:
  - Splits a full response into tokens with `fullText.split(/(\s+)/)`.
  - Emits tokens using recursive `setTimeout` (~30ms).
  - Appends tokens into the assistant message via `useChatStore.getState().appendToken(messageId, token)`.
  - Exposes `startMockStream(text, messageId)` and `stopMockStream()` to start/cancel.
- Why this design:
  - Keeps timers and cancellation logic outside of React components to avoid tying lifecycle to UI and to prevent unnecessary re-renders.
  - The store focuses on minimal updates to the relevant message only.

## Message List Performance

- **FlashList**: Used over FlatList for large/rapidly updating lists thanks to better item measurement and recycling behavior.
- **Re-render minimization**:
  - `MessageItem` is wrapped in `memo` to avoid unnecessary re-renders.
  - Stable keys via `keyExtractor={(item) => item.id}`.
  - The store updates only the single message being streamed (`appendToken` replaces one item by index) rather than re-creating the entire array.

## Auto-Scroll UX

- While streaming, if the user is near the bottom, the list auto-scrolls on every new token.
- If the user scrolls up, auto-scroll pauses and does not yank the user back down.
- Implemented with:
  - `isNearBottom` ref updated in `onScroll`
  - `scrollToEnd` only when `isNearBottom` is true and last message content changes

## Markdown While Streaming

- Messages use `react-native-markdown-display` to render content.
- As tokens append, the markdown view updates progressively (bold, headings, inline code, etc.).

## Stop Generation

- The send button becomes a stop button when streaming.
- `stopMockStream()` cancels the timer and the store clears `isStreaming`, allowing immediate new requests or edits.

# Edge Cases and Behavior

- **Spam Send**: If a stream is in progress and you press send again, the current stream is canceled first, then a new one starts.
- **Empty input**: Ignored.
- **Keyboard handling**: Uses `KeyboardAvoidingView` (iOS) and `softwareKeyboardLayoutMode: "pan"` (Android) to prevent overlap.
- **Empty state**: Friendly placeholder shown until you send the first message.

# Project Structure

```
src/
  app/
    _layout.tsx          # Fonts and router stack
    index.tsx            # Screen shell: header, chat, input
  components/
    app-header.tsx
    bottom-input.tsx     # Send/Stop logic, input
    chat-screen.tsx      # FlashList, autoscroll
    empty-view.tsx
    message-item.tsx     # Markdown + memo
  mock/
    mock-response.ts     # Long text used for streaming
  store/
    types.ts
    useChatStore.ts      # Zustand store: messages + streaming state
  utils/
    crypto.ts            # uuidv4 helper
    stream-engine.ts     # core streaming logic
```

# Scripts

```json
{
  "start": "expo start --dev-client -c",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web"
}
```

# Why FlashList

- Better performance characteristics for dynamic and long lists than FlatList.
- Efficient cell recycling and measurement reduce re-renders and dropped frames during rapid updates.
- Keeps the UI responsive at 60fps while tokens stream.
