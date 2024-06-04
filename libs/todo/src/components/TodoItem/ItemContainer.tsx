import React from 'react'
import { ListItem, ListItemProps, XStack } from 'tamagui'

const ItemContainer: React.FC<React.PropsWithChildren<ListItemProps>> = ({children, ...rest}) => {
  return (
    <ListItem pressTheme {...rest}>
      <XStack alignItems='center' gap="$3">
        {children}
      </XStack>
    </ListItem>
  )
}

export default ItemContainer