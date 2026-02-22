import { useMutation, useQuery } from 'react-query';
import Keychain from 'react-native-keychain';

import auth from '../api/auth';
import { useNav } from './nav';
import { APIError, UserLogin } from '../types/commons';

import { SESSION_TIMEOUT } from '../constants/commons';

export const useLogin = () => {
  const navigation = useNav();
  const mutation = useMutation({
    mutationFn: ({ username, password }: {
      username: string;
      password: string;
    }) => auth.login(username, password),
    onSuccess: async (data: UserLogin) => {
      await Keychain.setGenericPassword(data.accessToken, data.refreshToken, {
        service: 'authToken',
      });
      navigation.to('Profile');
    },
  });
  return {
    ...mutation,
    error: mutation.error as APIError,
  };
};

export const useFetchUser = () => {
  const navigation = useNav();
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => auth.getUser(),
    retry: false,
    staleTime: SESSION_TIMEOUT * 60 * 1000,
    onError: (error: APIError) => {
      Keychain.resetGenericPassword({
        service: 'authToken',
      });
      if (error.code === 401) {
        navigation.reset('Home');
      }
    },
    refetchInterval: SESSION_TIMEOUT * 60 * 1000,
  });
  return {
    ...query,
    error: query.error as APIError,
  };
};
