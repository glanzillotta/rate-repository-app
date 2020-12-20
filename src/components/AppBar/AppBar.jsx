import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        padding: 10,
        backgroundColor: theme.colors.navBar,
        flexDirection: 'row',
    }
});

const AppBar = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <AppBarTab value={'Repository'} />
                    <AppBarTab value={'SignIn'} route={'SignIn'} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;