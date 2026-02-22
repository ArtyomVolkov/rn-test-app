import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';

import AppRoot from './app';

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppRoot />
        </QueryClientProvider>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
