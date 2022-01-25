import axios from 'axios';
import {
  authInterceptor,
  responseDataInterceptor,
  interceptor401,
  interceptor500,
  errorInterceptor,
} from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { load } from 'js-yaml';

import registry from './store';
import { API_ERROR } from './constants';

const interceptor403 = (error) => {
  const store = registry.getStore();
  if (error.response && error.response.status === 403) {
    store.dispatch({ type: API_ERROR, payload: 403 });
  }

  throw error;
};

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.response.use(responseDataInterceptor);

axiosInstance.interceptors.response.use(null, interceptor401);
axiosInstance.interceptors.response.use(null, interceptor403);
axiosInstance.interceptors.response.use(null, interceptor500);
axiosInstance.interceptors.response.use(null, errorInterceptor);

export const getConfig = async () => {
  const config = await axiosInstance.get(
    `${insights.chrome.isBeta() ? '/beta' : ''}/config/main.yml`
  );
  return load(config);
};

export const getApplicationSchema = async (application, apiVersion = 'v1') =>
  axiosInstance.get(`/api/${application}/${apiVersion}/settings`);

export const saveValues = async (application, values, apiVersion = 'v1') =>
  axiosInstance.post(`/api/${application}/${apiVersion}/settings/`, {
    ...values,
  });
