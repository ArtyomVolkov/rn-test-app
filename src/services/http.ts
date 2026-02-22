import axios, { AxiosError } from 'axios';
import Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

import { refreshToken } from '../api/auth';

import { API_URL, REQUEST_TIMEOUT } from '../constants/commons';

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // OAuth 2.0 token refresh flow 
    // if (error.response && error.response.status === 401 && !error.config._retry) {
    //   error.config._retry = true;
    //   return requestRefreshToken(error);
    // }
    // error.config._retry = false;

    if (error.response && error.response.status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Unauthorized',
        text2: error.response.data?.message || 'Please log in again',
        position: 'bottom',
      });
    }

    if (error.response) {
      const { status, data } = error.response;

      return Promise.reject({
        code: status,
        message: data?.message || 'An error occurred',
      });
    }
    return Promise.reject({
      code: 0,
      message: error.message || 'Network error',
    });
  },
);

const requestRefreshToken = async (error: AxiosError) => {
  const keychain = await Keychain.getGenericPassword({ service: 'authToken' });

  if (!keychain || !keychain.password) {
    Toast.show({
      type: 'error',
      text1: 'Unauthorized',
      text2: 'No refresh token available. Please log in again.',
      position: 'bottom',
    });
    return Promise.reject({
      code: error.response?.status,
      message: error.response?.data || 'Unauthorized',
    });
  }
  const token = await refreshToken(keychain.password);

  if (!token) {
    Toast.show({
      type: 'error',
      text1: 'Unauthorized',
      text2: 'Failed to refresh token. Please log in again.',
      position: 'bottom',
    });
    return Promise.reject({
      code: error.response?.status,
      message: 'Failed to refresh token',
    });
  }
  await Keychain.setGenericPassword(token.accessToken, token.refreshToken, {
    service: 'authToken',
  });
  const request = error.config;

  if (!request) {
    Toast.show({
      type: 'error',
      text1: 'Unauthorized',
      text2: 'Failed to retry request after token refresh. Please log in again.',
      position: 'bottom',
    });
    return Promise.reject({
      code: error.response?.status,
      message: 'Failed to retry request after token refresh',
    });
  }
  request.headers['Authorization'] = `Bearer ${token.accessToken}`;
  return http(request);
};

export default http;