import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import {models, RootModel} from './models';

// redux store
const store = init({
  models,
});

export {store};
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
