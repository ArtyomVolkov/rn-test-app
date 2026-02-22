import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';

type InputFieldProps = {
  error?: string;
  label?: string;
  clearButton?: boolean;
  disabled?: boolean;
} & React.ComponentProps<typeof TextInput>;

const InputField: React.FC<InputFieldProps> = ({
  error,
  label,
  clearButton = true,
  disabled,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelFadeIn = useRef(new Animated.Value(0)).current;
  const labelTransform = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!label) {
      return;
    }
    const isActive = isFocused || rest.value;

    Animated.timing(labelFadeIn, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelTransform, {
      toValue: isActive ? -7 : 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [label, isFocused]);

  const onClear = () => {
    rest.onChangeText?.('');
  };

  return (
    <View style={styles.container}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            {
              opacity: labelFadeIn,
              color: error ? styles.error.color : styles.focus.borderColor,
              transform: [{ translateY: labelTransform }],
            },
          ]}
        >
          {label}
        </Animated.Text>
      )}
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        placeholderTextColor={
          error ? styles.error.color : styles.placeholder.color
        }
        style={[
          styles.input,
          rest.value && styles.filled,
          isFocused && styles.focus,
          disabled && styles.disabled,
          error && { borderColor: styles.error.color },
        ]}
        {...rest}
      />
      {clearButton && rest.value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.crossIcon}>×</Text>
        </TouchableOpacity>
      ) : null}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  placeholder: {
    color: '#A9A9A9',
  },
  input: {
    height: 54,
    borderColor: '#D8E2E6',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  label: {
    position: 'absolute',
    fontSize: 12,
    backgroundColor: '#F5F8FA',
    paddingHorizontal: 4,
    borderRadius: 4,
    left: 12,
    zIndex: 10,
  },
  focus: {
    borderColor: '#338BFF',
  },
  filled: {
    borderColor: '#338BFF',
  },
  error: {
    color: '#FF0004',
    fontSize: 12,
    paddingHorizontal: 4,
    lineHeight: 16.8,
  },
  disabled: {
    opacity: 0.5,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 19,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: '#BCC7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default InputField;
