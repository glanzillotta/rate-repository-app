import React from 'react';
import { useHistory } from 'react-router-native';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik, } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const initialValue = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundCard,
    paddingTop: 30
  },
  singInButton: {
    backgroundColor: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.textPrimary,
    borderRadius: 3,
    padding: 10,
    margin: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').trim(),
  password: yup.string().required('Password is required').trim()
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.form}>
      <FormikTextInput testID='usernameField' name='username' placeholder='Username' />
      <FormikTextInput testID='passwordField' name='password' secureTextEntry placeholder='Password' />
      <TouchableWithoutFeedback testID='singInButton' onPress={onSubmit}>
        <Text style={styles.singInButton}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInContainer = ({ onSubmit}) => {
  return (<Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>);
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      data ? history.push('/') : null;
    } catch (e) {
      console.log(e);
    }
  };

  return<SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;