import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error) 
    }
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username: username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();    
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;