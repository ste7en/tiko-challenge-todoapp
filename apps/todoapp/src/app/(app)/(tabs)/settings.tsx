import { Alert, SectionList } from 'react-native'
import React from 'react'
import { useSession } from '@tiko-challenge/authentication-core'
import { ListItem, Text, View } from 'tamagui'

const Settings = () => {
  const {signOut} = useSession()

  const DATA = [
    {
      title: 'Account',
      data: [{
        label: 'Logout',
        action: () => Alert.alert(
          'Are you sure you want to sign out?',
          'You will need to sign in again to access your account and data.',
          [
            {text: 'No', style: 'cancel'},
            {onPress: signOut, text: 'Yes', style: 'destructive'}
          ],
          {cancelable: true}
        )
      }]
    }
  ]

  return (
    <View style={{flex: 1}}>
      <SectionList
        sections={DATA}
        renderSectionHeader={({section: {title}}) => <Text padding="$2">{title}</Text>}
        renderItem={({item}) => (
          <ListItem title={item.label} onPress={item.action} pressTheme />
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  )
}

export default Settings