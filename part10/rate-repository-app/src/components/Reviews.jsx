import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import EnhancedText from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => 
  <View style={{flexDirection: 'row', margin: 10}}>
    <View style={{borderStyle:'solid', borderWidth:1, borderColor: theme.colors.primary, width:30, height:30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: theme.colors.primary, textAlign:'center'}}>{ review.rating }</Text>
    </View>
    <View style={{marginLeft: 10}}>
      <EnhancedText fontWeight='bold' style={{textAlign:'left'}}>{review.repository.fullName}</EnhancedText>
      <EnhancedText color='textSecondary' style={{marginTop: 5, marginBottom: 5}}>{`${new Date(review.createdAt).toLocaleDateString()}`}</EnhancedText>
      <Text>{ review.text }</Text>
    </View>
  </View>
;

const Reviews = () => {
  const result = useQuery(ME,{
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews:true },
  });

  if (!result?.data) {
    return null;
  }

  console.log(result)

  const reviewNodes = result.data.me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      />
  );
};

export default Reviews;