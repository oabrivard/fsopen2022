import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({id, first}) => {
  const skip = id ? false : true;

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY,{
    fetchPolicy: 'cache-and-network',
    variables: { id, first },
    skip
  });

  if (error) {
    console.log('error: ', error)
  } else {
    if (!skip) {
      console.log('data: ', data)
    }
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return { 
    repository: skip || loading ? null : data.repository, 
    fetchMore: handleFetchMore,
    loading 
  };
};

export default useRepository;