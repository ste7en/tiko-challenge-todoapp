import { useSession } from '@tiko-challenge/authentication';
import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { View } from 'tamagui';

const Home = () => {
  const {signOut} = useSession()
  return (
    <View flex={1}>
      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
};

export default Home