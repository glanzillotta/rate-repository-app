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

        if (data && !loading) {
            setRepository(data.repository);
            setReviews(data.repository.reviews.edges.map(edge => edge.node));
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
                console.log('fetchMoreResult: ', fetchMoreResult);
                console.log('previousResult: ', previousResult);
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
                console.log('nextResult:', nextResult);

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