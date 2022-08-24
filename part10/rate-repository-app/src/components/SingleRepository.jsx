import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import EnhancedText from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => <>
  <RepositoryItem repository={repository} />
  <ItemSeparator />
</>;

const ReviewItem = ({ review }) => 
  <View style={{flexDirection: 'row', margin: 10}}>
    <View style={{borderStyle:'solid', borderWidth:1, borderColor: theme.colors.primary, width:30, height:30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: theme.colors.primary, textAlign:'center'}}>{ review.rating }</Text>
    </View>
    <View style={{marginLeft: 10}}>
      <EnhancedText fontWeight='bold' style={{textAlign:'left'}}>{review.user.username}</EnhancedText>
      <EnhancedText color='textSecondary' style={{marginTop: 5, marginBottom: 5}}>{`${new Date(review.createdAt).toLocaleDateString()}`}</EnhancedText>
      <Text>{ review.text }</Text>
    </View>
  </View>
;

const SingleRepository = () => {
  const id = useParams().id
  const { repository, fetchMore } = useRepository({id, first:8});

  const onEndReach = () => {
    console.log('fetch more 2');
    fetchMore();
  };

  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      />
  );
};

export default SingleRepository;