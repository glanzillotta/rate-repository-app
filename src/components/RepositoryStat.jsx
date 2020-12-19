import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
    },
    stat: {
        fontWeight: theme.fontWeights.bold
    },
});

const abbNumbers = (num) => {
    if (num > 1000)
        return (num / 1000).toFixed(2) + 'k';
    else if (num > 1000000)
        return (num / 1000).toFixed(2) + 'M';
    else return num;
};

const RepositoryStat = ({ name, stat }) => {
    return (
        <View style={styles.tab}>
            <Text style={styles.stat}>{abbNumbers(stat)}</Text>
            <Text>{name}</Text>
        </View>
    );
};

export default RepositoryStat;