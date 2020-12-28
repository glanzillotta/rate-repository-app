import { useMutation } from '@apollo/react-hooks';

import { POST_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [mutate, result] = useMutation(POST_REVIEW);

    const postReview =  async ({ownerName, repositoryName, text, rating}) =>{
        try {
            const ratingNumber= Number(rating)
            const result= await mutate({variables:{ ownerName, repositoryName, text, rating:ratingNumber}})
            return result;
        }catch(e){
            console.log(e);
        }
    };

    return [ postReview, result];
}

export default useReview; 