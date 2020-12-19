import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.navBar,
        flexDirection: 'row'
    }
});

const AppBar = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <ScrollView style={{marginHorizontal: 20,}} horizontal>
                    <AppBarTab value={'Repository'} />
                    <AppBarTab value={'SignIn'} route={'SignIn'} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBar;