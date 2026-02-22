import { StyleSheet, View, Text } from 'react-native';

import { APIError } from '../types/commons';

type ErrorBoxProps = {
  error: APIError;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{error?.message || 'An error occurred'}</Text>
      </View>
    </View>
  );
};

export default ErrorBox;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    borderRadius: 8,
  },
  messageBox: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  message: {
    color: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF0000',
    textAlign: 'center',
    lineHeight: 16,
  },
});
