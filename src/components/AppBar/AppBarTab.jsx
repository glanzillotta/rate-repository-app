import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
    text:{
        color: theme.colors.textSecondary,
    padding: 15,
    fontFamily: theme.fonts.main,
    fontSize: 24,
    fontWeight: theme.fontWeights.bold
}
});

const AppBarTab = () => {
    return (
        <TouchableWithoutFeedback>
            <View>
                <Text style={styles.text}>Repository</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;