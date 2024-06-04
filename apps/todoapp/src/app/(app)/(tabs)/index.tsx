import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TodoList } from '@tiko-challenge/todo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const {top} = useSafeAreaInsets()
  return (
    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={top}>
      <TodoList />
    </KeyboardAvoidingView>
  )
};

export default Home