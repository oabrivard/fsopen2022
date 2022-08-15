import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error) 
    }
  });

  const signUp = async (userData) => {
    const { data } = await mutate({ variables: {user: userData} });
    return { data };
  };

  return [signUp, result];
};

export default useSignUp;