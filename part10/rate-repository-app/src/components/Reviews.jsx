import { FlatList, View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import EnhancedText from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW)

  const removeReview = async (id) => {
    await deleteReview({
      variables: { id },
      onError: (error) => { console.log(error) }  
    });
    console.log('deleted review : ', id);
    refetch();
  }

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        { text: "Delete", onPress: () => removeReview(id) }
      ]
    );  

    console.log(review.id)
  return (
    <View>
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
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Pressable onPress={() => navigate(`/repositories/${review.repository.id}`)}>
          <View style={{backgroundColor: theme.colors.primary, borderRadius: 5, flexGrow:1, margin: 10}}>
            <Text style={{padding: 15, color: 'white', textAlign: 'center'}}>View repository</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => createTwoButtonAlert(review.id)}>
          <View style={{backgroundColor: 'red', borderRadius: 5, flexGrow:1, margin: 10}}>
            <Text style={{padding: 15, color: 'white', textAlign: 'center'}}>Delete review</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

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
      renderItem={({ item }) => <ReviewItem review={item} refetch={result?.refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      />
  );
};

export default Reviews;