import { StyleSheet, View, Text } from 'react-native';

type NoDataProps = {
  title?: string;
  message?: string;
};

const NoData: React.FC<NoDataProps> = ({
  title = 'No Data',
  message = 'Requested data is not available.',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    color: 'gray',
  },
});
