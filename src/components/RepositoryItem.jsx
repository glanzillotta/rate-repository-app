import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import RepositoryStat from './RepositoryStat';

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        borderRadius: 5
    },
    card: {
        backgroundColor: theme.colors.backgroundCard,
        padding: 10,
    },
    detail: {
        flexDirection: 'column',
        paddingLeft: 10,
        alignItems: 'flex-start',
    },
    headerCard: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    text: {
        fontSize: theme.fontSizes.subheading,
        paddingTop: 5,
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    language: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        color: "white",
        width: 'auto',
    },
});

const RepositoryItem = ({ item }) => {

    return (
        <View style={styles.card}>
            <View style={styles.headerCard}>
                <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
                <View style={styles.detail}>
                    <Text style={{ ...styles.bold, ...styles.text }}>{item.fullName}</Text>
                    <Text style={styles.text}>{item.description}</Text>
                    <Text style={{ ...styles.language, ...styles.text }}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <RepositoryStat name={'Stars'} stat={item.stargazersCount} />
                <RepositoryStat name={'Forks'} stat={item.forksCount} />
                <RepositoryStat name={'Reviews'} stat={item.reviewCount} />
                <RepositoryStat name={'Ratings'} stat={item.ratingAverage} />
            </View>
        </View>
    );
};

export default RepositoryItem;