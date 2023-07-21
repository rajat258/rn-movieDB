import axios from 'axios';
import {Url} from '../constants';

interface ApiPropType {
  endpoint: string;
  body: object;
}

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: process.env.AUTH_TOKEN,
};

const api = axios.create({
  baseURL: Url.baseURL,
  headers: header,
});

export const getData = async (endpoint: string) => {
  const res = await api.get(endpoint);
  return res?.data;
};

export const postData = async ({endpoint, body}: ApiPropType) => {
  const res = await api.post(endpoint, JSON.stringify(body));
  return res?.data;
};
