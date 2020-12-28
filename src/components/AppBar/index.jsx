import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { AUTHORIZED } from '../../graphql/queries';
import AuthStorageContext from '../../contexts/AuthStorageContext';

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
    const { data } = useQuery(AUTHORIZED);
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const isLoggedIn = data ? data.authorizedUser : false;

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };


    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <AppBarTab value='Repository' />
                    {isLoggedIn ? <AppBarTab value='Create a review' route='review' /> : <AppBarTab value='SignUp' route='SignUp' />}
                    {isLoggedIn ?
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