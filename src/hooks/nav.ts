import { useNavigation } from '@react-navigation/native';

import { Navigation, StackParamList } from '../types/commons';

export const useNav = () => {
  const navigation = useNavigation<Navigation>();

  const to = (screen: keyof StackParamList) => {
    navigation.navigate(screen);
  };

  const back = () => {
    navigation.goBack();
  };

  const reset = (screen: keyof StackParamList) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  return {
    to,
    back,
    reset,
  };
};
