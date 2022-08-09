import React from 'react';
import {Navigator} from './navigator';
import {Provider} from 'react-redux';
import {store} from './rematch/store';

export const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
