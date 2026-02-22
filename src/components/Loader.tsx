import { StyleSheet, View, Text } from 'react-native';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 20,
  },
});
