import React from 'react';
import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
  
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  inputBox: {
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 5,
    margin: 10
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

const RepositoryListHeader = ({ ordering, setOrdering, searchKeyword, setSearchKeyword }) =>
  <View>
    <TextInput 
      value={searchKeyword} 
      style={styles.inputBox} 
      placeholder="Search..." 
      onChangeText={value => setSearchKeyword(value)}
      />
    <Picker itemStyle={{height:50}}
      selectedValue={ordering}
      onValueChange={(itemValue) => setOrdering(itemValue)}>
      <Picker.Item label='Latest repositories' value='CREATED_AT|DESC' />
      <Picker.Item label='Highest rated repositories' value='RATING_AVERAGE|DESC' />
      <Picker.Item label='Lowest rated repositories' value='RATING_AVERAGE|ASC' />
    </Picker>
  </View>

export class RepositoryListContainer extends React.Component {
  renderHeader = () => 
    <RepositoryListHeader  
      ordering={this.props.ordering}
      setOrdering={this.props.setOrdering}
      searchKeyword={this.props.searchKeyword}
      setSearchKeyword={this.props.setSearchKeyword} 
    />;

  render() {
    const repositoryNodes = this.props.repositories ? this.props.repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={renderItem}
        onEndReached={this.props.onEndReach}
      />
    );
  }
}

const RepositoryList = () => {
  const [ordering, setOrdering] = useState('CREATED_AT|DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchKeywordValue] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories({ordering, searchKeywordValue, first:8});

  const onEndReach = () => {
    console.log('fetch more');
    fetchMore();
  };

  return <RepositoryListContainer 
    repositories={repositories} 
    ordering={ordering} 
    setOrdering={setOrdering} 
    searchKeyword={searchKeyword} 
    setSearchKeyword={setSearchKeyword}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;
