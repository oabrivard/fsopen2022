import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error) 
    }
  });

  const createReview = async (reviewData) => {
    const { data } = await mutate({ variables: {review: reviewData} });
    return { data };
  };

  return [createReview, result];
};

export default useCreateReview;