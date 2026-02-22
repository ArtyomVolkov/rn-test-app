import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Page from '../components/Page';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ErrorBox from '../components/ErrorBox';

import { useLogin } from '../hooks/auth';
import Validation from '../utils/validation';

const LoginScreen = () => {
  const { mutate, isLoading, isError, error } = useLogin();
  const [validation, setValidation] = useState({
    username: '',
    password: '',
  });
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    mutate(form);
  };

  const onChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setValidation(prev => ({
      ...prev,
      [name]: Validation[name as keyof typeof Validation](value),
    }));
  };

  return (
    <Page>
      <View style={styles.form}>
        <InputField
          placeholder="Username"
          label="Username"
          inputMode="email"
          disabled={isLoading}
          value={form.username}
          error={validation.username}
          onChangeText={text => onChange('username', text)}
        />
        <InputField
          placeholder="Password"
          label="Password"
          secureTextEntry
          value={form.password}
          error={validation.password}
          onChangeText={text => onChange('password', text)}
          disabled={isLoading}
        />
        {isError && <ErrorBox error={error} />}
        <Button
          color="primary"
          title="Login"
          loading={isLoading}
          onPress={handleLogin}
          disabled={
            !form.username ||
            !form.password ||
            validation.username !== '' ||
            validation.password !== ''
          }
        />
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
    width: '100%',
  },
});

export default LoginScreen;
