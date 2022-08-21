import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (ordering) => {
  const [orderBy, orderDirection] = ordering.split('|');
  
  const { data, error, loading } = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection },
  });

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }

  return { repositories: loading || error ? null : data.repositories, loading };
};

export default useRepositories;