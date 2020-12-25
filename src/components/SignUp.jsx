import React from 'react';
import * as yup from 'yup';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { Formik, } from 'formik';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValue = {
    username: '',
    password: '',
    passwordConfirm: '',
}

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').trim(),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').trim(),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirm is required')
})

const styles = StyleSheet.create({
    form: {
        flexGrow: 1,
        backgroundColor: theme.colors.backgroundCard,
        paddingTop: 30
    },
    singUpButton: {
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

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' secureTextEntry />
            <FormikTextInput name='passwordConfirm' placeholder='Password Confirmation' secureTextEntry />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.singUpButton}>Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

const SignUpContainer = ({ onSubmit }) => {
    return (<Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>);
}

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const history = useHistory();


    const onSubmit = async ({ username, password}) => {
        try {
            await signUp({ username, password })
            const { data } = await signIn({ username, password });
            data ? history.push('/') : null;
        } catch (e) {
            console.log(e);
        }

    }

    return <SignUpContainer onSubmit={onSubmit} />

}

export default SignUp;