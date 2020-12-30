import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useHistory } from 'react-router-native';

import { GET_TOKEN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);
    const history = useHistory();
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        if (data) {
            await authStorage.setAccessToken(data.authorize.accessToken);
            apolloClient.resetStore();
            history.push('/');
        }
    };

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        history.push('/');
    };

    return {signIn, signOut, result};
};

export default useSignIn; 