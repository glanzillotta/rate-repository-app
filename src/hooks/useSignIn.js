import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';

import { GET_TOKEN } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);
    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signIn = async ({ username, password }) => {   
        try {
            const result = await mutate({ variables: { username, password } });
            const userAccess= new AuthStorage();
            await userAccess.setAccessToken(result.data.authorize.accessToken);
            return result;
        } catch (e) {
            console.log(e);
        }
    };

    return [signIn, result];
};

export default useSignIn; 