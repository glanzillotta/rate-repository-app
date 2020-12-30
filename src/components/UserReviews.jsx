import React from 'react';
import { FlatList, View, TouchableWithoutFeedback as TouchableHighlight, Text, StyleSheet, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { format } from 'date-fns';

import useAuthUserReviews from '../hooks/useAuthUserReviews';
import useReview from '../hooks/useReview';
import theme from '../theme';

const styles = StyleSheet.create({
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
    button: {
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
    deleteButton: {
        backgroundColor: theme.colors.textError
    },
    siteButton: {
        backgroundColor: theme.colors.primary,
    },
    separator: {
        height: 10
    },
    repository: {
        fontWeight: theme.fontWeights.bold
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item, handelDelete, history }) => {
    return (
        <View>
            <View style={styles.reviewCard}>
                <Text style={styles.reviewRating}>{item.rating}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.repository}>{item.repository.name}</Text>
                    <Text>{format(new Date(item.createdAt), 'dd/MMM/yyyy')}</Text>
                    <Text>{item.text}</Text>
                </View>
            </View>
            <View style={styles.reviewCard}>
                <TouchableHighlight onPress={() => history.push(`/repositories/${item.repository.id}`)}>
                    <Text style={{ ...styles.button, ...styles.siteButton }}>View Repository</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handelDelete(item.id)}>
                    <Text style={{ ...styles.button, ...styles.deleteButton }}>Delete Review</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const UserReviewsContainer = ({ reviews, onEndReach, handelDelete, history }) => {
    return (
        <FlatList
            data={reviews}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <ReviewItem item={item} handelDelete={handelDelete} history={history} />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
        />

    );
};

const UserReviews = () => {
    const { reviews, fetchMore, refetch } = useAuthUserReviews(true, 2);
    const { removeReview } = useReview();
    const history = useHistory();

    const handelDelete = (id) => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this?',
            [
                {
                    text: 'Delete',
                    onPress: () => {
                        try {
                            removeReview(id);
                            refetch();
                        } catch (e) {
                            console.log(e);
                        }

                    },
                },
                {text: 'Cancel'}
            ]
        );
    };

    const onEndReach = () => {
        fetchMore();
    };

    if (!reviews) return null;

    return (
        <UserReviewsContainer reviews={reviews} onEndReach={onEndReach} handelDelete={handelDelete} history={history} />
    );
};

export default UserReviews;