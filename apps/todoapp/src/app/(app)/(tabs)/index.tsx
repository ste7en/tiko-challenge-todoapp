import React from 'react';
import { View } from 'tamagui';
import { TodoList } from '@tiko-challenge/todo';



const Home = () => {
  return (
    <View flex={1}>
      <TodoList />
    </View>
  )
};

export default Home