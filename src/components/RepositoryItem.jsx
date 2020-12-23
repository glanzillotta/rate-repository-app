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
        fontFamily: theme.fonts.main,
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
                    <Text testID='fullName' style={{ ...styles.bold, ...styles.text }}>{item.fullName}</Text>
                    <Text testID='description' style={styles.text}>{item.description}</Text>
                    <Text testID='language' style={{ ...styles.language, ...styles.text }}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <RepositoryStat testID='stargazersCount' name='Stars' stat={item.stargazersCount} />
                <RepositoryStat testID='forksCount' name='Forks' stat={item.forksCount} />
                <RepositoryStat testID='reviewCount' name='Reviews' stat={item.reviewCount} />
                <RepositoryStat testID='ratingAverage' name='Ratings' stat={item.ratingAverage} />
            </View>
        </View>
    );
};

export default RepositoryItem;