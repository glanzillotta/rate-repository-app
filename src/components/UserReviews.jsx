import React from 'react';
import { FlatList, View } from 'react-native';

import { ReviewItem } from './SingleRepository';
import useAuthUserReviews from '../hooks/useAuthUserReviews';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const UserReviewsContainer = ({reviews, onEndReach}) => {
    return (
        <FlatList
            data={reviews}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
        />

    );
};

const UserReviews = () => {
    const { reviews, fetchMore } = useAuthUserReviews(true, 2);

    const onEndReach = () => {
        fetchMore();
    };

    if(!reviews) return null;

    return (
        <UserReviewsContainer reviews={reviews} onEndReach={onEndReach} />
    );
};

export default UserReviews;