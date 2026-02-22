import { StyleSheet, View } from 'react-native';

type PageProps = {
  children: React.ReactNode;
  style?: object;
};

const Page: React.FC<PageProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    padding: 20,
  },
});
