import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ordering, searchKeyword, first}) => {
  const [orderBy, orderDirection] = ordering.split('|');
  const variables = { orderBy, orderDirection, searchKeyword, first };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: loading || error ? null : data.repositories, 
    fetchMore: handleFetchMore,
    loading 
  };
};

export default useRepositories;