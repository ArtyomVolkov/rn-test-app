import Page from '../components/Page';
import Button from '../components/Button';

import { useNav } from '../hooks/nav';

const HomeScreen = () => {
  const navigation = useNav();

  const handleLoginPress = () => {
    navigation.to('Login');
  };

  return (
    <Page>
      <Button color="primary" title="Go to login" onPress={handleLoginPress} />
    </Page>
  );
};

export default HomeScreen;
