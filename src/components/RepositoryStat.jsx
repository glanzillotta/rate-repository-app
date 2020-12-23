import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';
import abrNumber from '../utils/abrNumber';

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
    },
    stat: {
        fontWeight: theme.fontWeights.bold
    },
});

const RepositoryStat = ({ name, stat, testID }) => {
    return (
        <View style={styles.tab}>
            <Text testID={testID} style={styles.stat}>{abrNumber(stat)}</Text>
            <Text>{name}</Text>
        </View>
    );
};

export default RepositoryStat;