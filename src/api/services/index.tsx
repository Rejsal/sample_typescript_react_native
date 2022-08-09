import {AxiosResponse} from 'axios';
import {api, catchHandler} from '@api';
import {endpoints} from '@server';

//get songs from API
export async function getSongsFromAPI() {
  return (await api())
    .get(`${endpoints.search}?term=Michael+jackson`)
    .then((res: AxiosResponse) => res.data)
    .catch(catchHandler);
}
