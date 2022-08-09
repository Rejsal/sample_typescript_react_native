import {Models} from '@rematch/core';
import {song} from './song';

export interface RootModel extends Models<RootModel> {
  song: typeof song;
}

export const models: RootModel = {song};
