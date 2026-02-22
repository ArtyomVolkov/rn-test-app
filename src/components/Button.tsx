import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  title: string;
  color?: 'default' | 'primary';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = 'default',
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[color],
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text
        style={[
          styles.title,
          {
            color: styles[color].color,
          },
        ]}
      >
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignContent: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  default: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  primary: {
    color: '#FFFFFF',
    backgroundColor: '#338BFF',
  },
  disabled: {
    opacity: 0.5,
  },
});
