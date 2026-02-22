import { NavigationProp } from '@react-navigation/native';
import { UserCredentials } from 'react-native-keychain';

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
}

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  age: number;
  phone: string;
  role: string;
};

export type UserLogin = Pick<User,
  'id' |
  'username' |
  'email' |
  'firstName' |
  'lastName' |
  'gender' |
  'image'
> & AuthToken;

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: undefined;
}

export type Navigation = NavigationProp<StackParamList>;

export type KeychainStore = false | UserCredentials;

export type APIError = {
  code: number;
  message?: string;
};