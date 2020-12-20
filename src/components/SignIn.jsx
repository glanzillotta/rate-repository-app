import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik, } from 'formik';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValue = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundCard,
    paddingTop:30
  },
  singInButton: {
    backgroundColor: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.textPrimary,
    borderRadius: 3,
    padding: 10,
    margin: 10,
  },
});

const SignInForm = () => {

  const onSubmit = () => {

  };

  return (
    <View style={styles.form}>
      <FormikTextInput name={'username'} placeholder={'Username'} />
      <FormikTextInput name={'password'} secureTextEntry placeholder={'Password'}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.singInButton}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  return (<Formik initialValues={initialValue}>
    {() => <SignInForm />}
  </Formik>);
};

export default SignIn;