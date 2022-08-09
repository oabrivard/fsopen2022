import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const skip = id ? false : true;

  const { data, error, loading } = useQuery(GET_REPOSITORY,{
    fetchPolicy: 'cache-and-network',
    variables: { id },
    skip
  });

  if (error) {
    console.log('error: ', error)
  } else {
    if (!skip) {
      console.log('data: ', data)
    }
  }

  return { repository: skip || loading ? null : data.repository, loading };
};

export default useRepository;