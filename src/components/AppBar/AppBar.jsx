import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.navBar,
    }
});

const AppBar = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <AppBarTab />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;