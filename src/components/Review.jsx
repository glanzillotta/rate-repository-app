import React from 'react';
import { Formik, } from 'formik';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';

const initialValue = {
    ownerName: '',
    name: '',
    rating: '',
    text: '',
};

const styles = StyleSheet.create({
    createReviewButton: {
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
    form: {
        backgroundColor: theme.colors.backgroundCard,
        paddingTop: 30
    }
});

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner name is required').min(3, 'Must be at least 3 characters').trim(),
    repositoryName: yup.string().required('Repository name is required').trim(),
    rating: yup.number().min(0, 'Must be greater than 0').max(100, 'Must be less than 100').required('Rating is required'),
});
const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name='ownerName' placeholder='Repository owner name' />
            <FormikTextInput name='repositoryName' placeholder='Repository name' />
            <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
            <FormikTextInput name='text' placeholder='Review' multiline />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.createReviewButton}>Create a Review</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const ReviewContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const Review = () => {
    const [postReview] = useReview();
    const history = useHistory();

    const onSubmit = async (ownerName, text, rating, repositoryName) => {
        try {
            const { data } = await postReview(ownerName, text, rating, repositoryName);
            data ? history.push(`/repositories/${data.id}`) : null;
        } catch (e) {
            console.log(e);
        }
    };

    return (<ReviewContainer onSubmit={onSubmit} />);
};

export default Review;