import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network'
  });

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }

  return { repositories: loading || error ? null : data.repositories, loading };
};

export default useRepositories;