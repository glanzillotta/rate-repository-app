import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import useSignIn from '../../hooks/useSignIn';
import useAuthUserReviews from '../../hooks/useAuthUserReviews';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        padding: 10,
        backgroundColor: theme.colors.navBar,
        flexDirection: 'row',
    },
    tab: {
        color: theme.colors.textSecondary,
        padding: 10,
        fontFamily: theme.fonts.main,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold
    }
});

const AppBar = () => {
    const { auth } = useAuthUserReviews();
    const { signOut } = useSignIn();

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <AppBarTab value='Repository' />
                    {auth ? <AppBarTab value='My reviews' route='user/reviews' /> : null}
                    {auth ? <AppBarTab value='Create a review' route='review' /> : <AppBarTab value='SignUp' route='SignUp' />}
                    {auth ?
                        <TouchableOpacity onPress={signOut}>
                            <Text style={styles.tab}>Sign out</Text>
                        </TouchableOpacity>
                        :
                        <AppBarTab value='SignIn' route='SignIn' />
                    }
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;