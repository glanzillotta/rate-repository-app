import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, searchKeyword) => {
  console.log('searchKeyword: ', searchKeyword);
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { ...order, searchKeyword }
  });
  const fetchRepositories = async () => {
    if (error) return console.error(error);

    if (data && !loading)
      setRepositories(data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;