import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Song, ViewSong} from '@screens';
import {SongModel} from 'src/rematch/models/song';

export type StackNavigatorParams = {
  Song: undefined;
  ViewSong: {song: SongModel} | undefined;
};

const Stack = createSharedElementStackNavigator<StackNavigatorParams>();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Song" component={Song} />
        <Stack.Screen
          name="ViewSong"
          component={ViewSong}
          sharedElements={route => {
            return [route.params.song.artworkUrl100];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
