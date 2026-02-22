import Keychain from 'react-native-keychain';
import { SESSION_TIMEOUT } from '../constants/commons';
import { User, UserLogin, AuthToken, KeychainStore } from '../types/commons';

import http from '../services/http';

const login = async (username: string, password: string): Promise<UserLogin> => {
  const resp = await http.post('/auth/login', {
    username,
    password,
    expiresInMins: SESSION_TIMEOUT,
  });
  return resp.data;
};

const getUser = async (): Promise<User> => {
  let accessToken = '';
  const keychain: KeychainStore = await Keychain.getGenericPassword({
    service: 'authToken',
  });

  if (keychain) {
    // accessToken is stored in username field (Keychain)
    accessToken = keychain.username;
  }
  const resp = await http.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data;
};

export const refreshToken = async (token: string): Promise<AuthToken | null> => {
  try {
    const resp = await http.post('/auth/refresh', {
      refreshToken: token,
      expiresInMins: SESSION_TIMEOUT,
    });
    return {
      accessToken: resp.data.accessToken,
      refreshToken: resp.data.refreshToken,
    }
  } catch (error) {
    return null;
  }
};

export default {
  login,
  getUser,
  refreshToken,
};
