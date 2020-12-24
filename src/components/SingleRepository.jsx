import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
    siteButton: {
        backgroundColor: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.textPrimary,
        borderRadius: 3,
        padding: 10,
        margin: 10,
    },
    cardButton: {
        backgroundColor: theme.colors.backgroundCard,
    },
    reviewRating: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.colors.primary,
        borderRadius: 15,
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        height: 30,
        width: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 5
    },
    reviewCard: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: theme.colors.backgroundCard,
    },
    textContainer: {
        padding: 5,
        width: '90%',
    },
    separator: {
        height: 10
    },
    username: {
        fontWeight: theme.fontWeights.bold
    }
});

const RepositoryInfo = ({ repository }) => {
    return (
        <View style={styles.cardButton}>
            <RepositoryItem item={repository} />
            <TouchableOpacity onPress={() => Linking.openURL(repository.url)}>
                <Text style={styles.siteButton}>Open in GitHub</Text>
            </TouchableOpacity>
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.reviewCard}>
            <Text style={styles.reviewRating}>{review.rating}</Text>
            <View style={styles.textContainer}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text>{format(new Date(review.createdAt), 'dd/MMM/yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;


const SingleRepository = () => {
    const { id } = useParams();

    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: { id },
    });
    console.log('loading: ', loading);
    if (!data || loading) return null;


    const reviews = data.repository ? data.repository.reviews.edges.map(edge => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={() => {
                return (
                    <View>
                        <RepositoryInfo repository={data.repository} />
                        <ItemSeparator />
                    </View>
                );
            }}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default SingleRepository;