import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

//create axios
export async function api() {
  const opts = {
    baseURL: Config.BASE_URL,
  };
  return axios.create(opts);
}

//api catch
export async function catchHandler(e: AxiosError) {
  if (e.response && e.response.status === 401) {
  }
  let res = e.response && e.response.data ? e.response.data : {message: ''};
  throw res;
}
