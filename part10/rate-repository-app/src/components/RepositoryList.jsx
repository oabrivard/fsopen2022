import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
  
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PressableRespositoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
      <RepositoryItem repository={item} />
    </Pressable>
)};

const renderItem = ({ item }) => (
  <PressableRespositoryItem item={item} />
);

const OrderingPicker = ({ ordering, setOrdering }) => 
  <Picker itemStyle={{height:50}}
    selectedValue={ordering}
    onValueChange={(itemValue) => setOrdering(itemValue)}>
    <Picker.Item label='Latest repositories' value='CREATED_AT|DESC' />
    <Picker.Item label='Highest rated repositories' value='RATING_AVERAGE|DESC' />
    <Picker.Item label='Lowest rated repositories' value='RATING_AVERAGE|ASC' />
  </Picker>

export const RepositoryListContainer = ({ repositories, ordering, setOrdering }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <OrderingPicker ordering={ordering} setOrdering={setOrdering} />}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const [ordering, setOrdering] = useState('CREATED_AT|DESC');
  const { repositories } = useRepositories(ordering);

  return <RepositoryListContainer repositories={repositories} ordering={ordering} setOrdering={setOrdering} />;
};

export default RepositoryList;
