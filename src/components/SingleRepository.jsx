import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepository from '../hooks/useRepository';

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

export const ReviewItem = ({ review }) => {
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

const SingleRepositoryContainer = ({ repository, reviews, onEndReach }) => {
    return (
        <FlatList
            data={reviews}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={() => {
                return (
                    <View>
                        <RepositoryInfo repository={repository} />
                        <ItemSeparator />
                    </View>
                );
            }}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
        />
    );
};


const SingleRepository = () => {
    const { id } = useParams();
    const { repository, reviews, fetchMore } = useRepository(id, 3);

    const onEndReach = () => {
        fetchMore();
      };
    

    if(!repository) return null;

    return <SingleRepositoryContainer repository={repository} reviews={reviews} onEndReach={onEndReach}/>;

};

export default SingleRepository;