import {createModel} from '@rematch/core';
import {RootModel} from '../';
import {getSongsFromAPI} from '@services';

// song model
export type SongModel = {
  artworkUrl100: string | null | undefined;
  trackName: string | null | undefined;
  artistName: string | null | undefined;
  kind: string | null | undefined;
  primaryGenreName: string | null | undefined;
  releaseDate: string | null | undefined;
  collectionPrice: string | null | undefined;
  currency: string | null | undefined;
  trackTimeMillis: number | null | undefined;
  previewUrl: string | null | undefined;
};

// song model state
export type SongState = {
  loading: boolean;
  error: string | null;
  songs: SongModel[];
};

export const song = createModel<RootModel>()({
  state: {
    loading: false,
    error: null,
    songs: [],
  } as SongState,

  // reducers
  reducers: {
    // on request
    onRequest(state: SongState) {
      return {
        ...state,
        loading: true,
      };
    },

    // on songs api success
    onGetSongs(state: SongState, data: SongModel[]) {
      return {
        ...state,
        loading: false,
        songs: data?.length > 0 ? data : [],
      };
    },

    // on error
    onError(state: SongState, error: string | null) {
      return {
        ...state,
        loading: false,
        error: error,
      };
    },
  },

  // effects
  effects: dispatch => ({
    // get song list
    async getSongs() {
      dispatch.song.onRequest();
      try {
        const data: {results: SongModel[]} = await getSongsFromAPI();
        dispatch.song.onGetSongs(data.results);
      } catch (e: any) {
        dispatch.song.onError(e?.message);
      }
    },
  }),
});
