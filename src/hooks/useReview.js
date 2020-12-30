import { useMutation } from '@apollo/react-hooks';

import { POST_REVIEW, REMOVE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [create] = useMutation(POST_REVIEW);
    const [remove] = useMutation(REMOVE_REVIEW);


    const postReview =  async ({ownerName, repositoryName, text, rating}) =>{
        try {
            const ratingNumber= Number(rating);
            return await create({variables:{ ownerName, repositoryName, text, rating:ratingNumber}});
        }catch(e){
            console.log(e);
        }
    };

    const removeReview = async (id) => {
        try {
            return await remove({variables:{id}});
        }catch (e){
            console.log(e);
        }
    };

    return  {postReview, removeReview};
};

export default useReview; 