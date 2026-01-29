import AppHeader from '@/components/app-header';
import BottomInput from '@/components/bottom-input';
import { KeyboardAvoidingView, Platform, StatusBar, Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <KeyboardAvoidingView
      className="pt-safe flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <AppHeader />
      <View className="flex-1" />
      <BottomInput />
    </KeyboardAvoidingView>
  );
}
