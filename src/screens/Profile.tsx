import { StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useQueryClient } from 'react-query';
import Keychain from 'react-native-keychain';

import Page from '../components/Page';
import Button from '../components/Button';
import NoData from '../components/NoData';
import Loader from '../components/Loader';
import ErrorBox from '../components/ErrorBox';

import { useNav } from '../hooks/nav';
import { useFetchUser } from '../hooks/auth';

const ProfileScreen = () => {
  const navigation = useNav();
  const queryClient = useQueryClient();
  const { data: user, error, isLoading } = useFetchUser();

  const handleLogout = async () => {
    await Keychain.resetGenericPassword({
      service: 'authToken',
    });
    queryClient.clear();
    navigation.reset('Home');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorBox error={error} />;
    }
    if (!user) {
      return (
        <NoData
          title="No User Data"
          message="Unable to fetch user information."
        />
      );
    }
    return (
      <>
        <Text
          style={styles.greeting}
        >{`Hi, ${user.firstName} ${user.lastName}`}</Text>
        <Image source={{ uri: user.image }} style={styles.image} />
        <Text style={styles.role}>{user.role}</Text>
        <Text style={styles.firstName}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={{ backgroundColor: styles.scrollView.backgroundColor }}
    >
      <Page style={styles.container}>{renderContent()}</Page>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F8FA',
    flexGrow: 1,
  },
  loading: {
    fontSize: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    justifyContent: 'flex-start',
    gap: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  role: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  firstName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastName: {
    fontSize: 16,
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  phone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
