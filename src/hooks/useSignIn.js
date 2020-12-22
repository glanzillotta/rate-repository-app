import { useMutation } from '@apollo/react-hooks';

import { GET_TOKEN } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);

    const signIn = async ({ username, password }) => {
        try {
            const {data} = await mutate({ variables: { username, password } });
            const userAccess= new AuthStorage(`${username}`);
            await userAccess.setAccessToken(data.authorize.accessToken);
        } catch (e) {
            console.log(e);
        }
    };

    return [signIn, result];
};

export default useSignIn; 