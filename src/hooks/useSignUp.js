import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        try {
            const result = await mutate({
                variables: {
                    username,
                    password
                }
            });
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    return [signUp, result]
}

export default useSignUp;