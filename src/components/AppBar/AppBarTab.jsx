import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { Link } from "react-router-native";

import theme from '../../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textSecondary,
        padding: 15,
        fontFamily: theme.fonts.main,
        fontSize: 24,
        fontWeight: theme.fontWeights.bold
    }
});

const AppBarTab = ({ value, route }) => {
    return (
        <TouchableWithoutFeedback>
            <View>
                <Link to={`/${route}`}>
                    <Text style={styles.text}>{value}</Text>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;