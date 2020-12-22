import { useMutation } from '@apollo/react-hooks';

import { GET_TOKEN } from '../graphql/queries';

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);

    const signIn = async ({ username, password }) => {
        try {
            return mutate({ variables: { username, password } });
        } catch (e) {
            console.log(e);
        }
    };

    return [signIn, result];
};

export default useSignIn; 