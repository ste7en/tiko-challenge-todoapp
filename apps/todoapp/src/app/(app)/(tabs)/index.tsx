import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TodoList } from '@tiko-challenge/todo';
import {useHeaderHeight} from '@react-navigation/elements'

const Home = () => {
  const offset = useHeaderHeight()
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={offset}
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <TodoList />
    </KeyboardAvoidingView>
  )
};

export default Home