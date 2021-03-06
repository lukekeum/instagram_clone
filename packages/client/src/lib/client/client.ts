import axios, { AxiosInstance, AxiosResponse } from 'axios';

class Client {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 3000,
    });
  }

  get(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .get(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  post(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .post(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  patch(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .patch(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  put(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .put(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  authHeaderSetup(access_token: string) {
    this._axios.defaults.headers.common['token'] = access_token;
  }

  get client() {
    return this._axios;
  }
}

const client = new Client();

export default client;
