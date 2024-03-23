import RequestHttp from './request';
import { ContentType } from '@/typings/global.d';

const http = new RequestHttp({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000,
  headers: { 'Content-Type': ContentType.APPLICATION_JSON }
});

export default http;
