import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthUserReviews = (includeReviews = false, first) => {
    const [reviews, setReviews] = useState();
    const [auth, setAuth] = useState();
    const { data, loading, error, fetchMore } = useQuery(GET_AUTHORIZED_USER, {
        variables: { includeReviews, first },
        fetchPolicy: 'cache-and-network',
    });

    const fetchAuth = async () => {
        if (error) console.error(error);

        if (data && !loading) {
            setAuth(data.authorizedUser);
            if (data.authorizedUser.reviews)
                setReviews(data.authorizedUser.reviews.edges.map(edge => edge.node));
        }
    };

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_AUTHORIZED_USER,
            variables: {
                includeReviews, first,
                after: data.authorizedUser.reviews.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...fetchMoreResult.authorizedUser,
                        reviews: {
                            ...fetchMoreResult.authorizedUser.reviews,
                            edges: [
                                ...previousResult.authorizedUser.reviews.edges,
                                ...fetchMoreResult.authorizedUser.reviews.edges,
                            ],
                        }
                    },
                };

                return nextResult;
            },
        });
    };

    useEffect(() => {
        fetchAuth();
    }, [data]);

    return {
        auth,
        reviews,
        fetchMore: handleFetchMore,
    };
};

export default useAuthUserReviews; 