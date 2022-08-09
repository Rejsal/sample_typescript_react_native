import 'react-native-gesture-handler';

import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Song, ViewSong} from '@screens';
import {SongModel} from 'src/rematch/models/song';

export type StackNavigatorParams = {
  Song: undefined;
  ViewSong: {song: SongModel} | undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const navigatorOptions: StackNavigationOptions = {
  headerShown: false,
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen
          name="Song"
          component={Song}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewSong"
          component={ViewSong}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
