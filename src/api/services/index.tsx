import {AxiosResponse} from 'axios';
import {api, catchHandler} from '@api';
import {endpoints} from '@server';
import {SongModel} from 'src/rematch/models/song';

//get songs from API
export async function getSongsFromAPI(): Promise<{results: SongModel[]}> {
  return (await api())
    .get(`${endpoints.search}?term=Michael+jackson`)
    .then((res: AxiosResponse) => res.data)
    .catch(catchHandler);
}
