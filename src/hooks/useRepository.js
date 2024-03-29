import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
    const [repository, setRepository] = useState();
    const [reviews, setReviews] = useState();
    const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
        variables: { id, first },
        fetchPolicy: 'cache-and-network',
    });

    const fetchRepository = async () => {
        if (error) console.error(error);

        try {
            if (data && !loading) {
                setRepository(data.repository);
                setReviews(data.repository.reviews.edges.map(edge => edge.node));
            }
        } catch (err) {
            console.error(error);
        }
    };

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                id, first,
                after: data.repository.reviews.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                        }
                    },
                };

                return nextResult;
            },
        });
    };

    useEffect(() => {
        fetchRepository();
    }, [data]);

    return {
        reviews,
        repository,
        fetchMore: handleFetchMore,
    };
};

export default useRepository; 