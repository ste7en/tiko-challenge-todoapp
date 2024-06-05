import React from 'react'
import { Trash2 } from '@tamagui/lucide-icons';
import { Swipeable } from 'react-native-gesture-handler'
import { Button, View } from 'tamagui';

type SwipeableContainerProps = React.PropsWithChildren<{
  onDelete: () => void
}>

const SwipeableContainer = ({children, onDelete}: SwipeableContainerProps) => {
  const swipeableRef = React.useRef<Swipeable>(null);
  const renderRightActions = () => {
    return (
      <View
        backgroundColor="red"
        justifyContent='center'
        alignItems='flex-end'
        flex={1}
      >
        <Button
          backgroundColor={'transparent'}
          borderRadius="0"
          onPress={onDelete}
          color={'white'}
          pressStyle={{opacity: 0.5}}
        >
          <Button.Icon>
            <Trash2 />
          </Button.Icon>
        </Button>
      </View>
    );
  };

  const onSwipeableOpen = () => {
    onDelete();
    swipeableRef.current?.close();
  };
  
  return (
    <Swipeable
      friction={1}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onSwipeableOpen}
      ref={swipeableRef}
    >
      {children}
    </Swipeable>
  )
}

export default SwipeableContainer