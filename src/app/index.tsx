import AppHeader from '@/components/app-header';
import BottomInput from '@/components/bottom-input';
import ChatScreen from '@/components/chat-screen';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

export default function App() {
  return (
    <KeyboardAvoidingView
      className="pt-safe flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <AppHeader />
      <ChatScreen />
      <BottomInput />
    </KeyboardAvoidingView>
  );
}
