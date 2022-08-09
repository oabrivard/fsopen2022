import { Text, View, Image, Pressable } from 'react-native';
import EnhancedText from './Text';
import * as Linking from 'expo-linking';
import theme from '../theme';

const formatNumber = (number) => number > 1000000 ? `${(number/1000000).toFixed(1)} M` : number > 1000 ? `${(number/1000).toFixed(1)} K` : `${number}`

const Author = ({avatar, fullName, description, language}) =>  
  <View style={{flexDirection: 'row'}}>
    <Image style={{width: 50, height: 50}} source={{uri: avatar}} />
    <View style={{flexDirection: 'column', marginLeft: 10}}>
      <EnhancedText fontWeight='bold'>{fullName}</EnhancedText>
      <EnhancedText color='textSecondary' style={{marginTop: 5}}>{description}</EnhancedText>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{backgroundColor: theme.colors.primary, borderRadius: 5}}>
          <Text style={{padding: 5, color: 'white'}}>{language}</Text>
        </View>
      </View>
    </View>
  </View>

const RepositoryItem = ({repository}) => {
  return (
    <View testID='repositoryItem' style={{margin: 10}}>
      <Author avatar={repository.ownerAvatarUrl} fullName={repository.fullName} description={repository.description} language={repository.language} />
      <View style={{flexDirection: 'row', margin: 10}}>
        <View style={{margin: 10}}>
          <EnhancedText fontWeight='bold' style={{textAlign:'center'}}>{formatNumber(repository.stargazersCount)}</EnhancedText>
          <EnhancedText color='textSecondary'>Stars</EnhancedText>
        </View>
        <View style={{margin: 10}}>
          <EnhancedText fontWeight='bold' style={{textAlign:'center'}}>{formatNumber(repository.forksCount)}</EnhancedText>
          <EnhancedText color='textSecondary'>Forks</EnhancedText>
        </View>
        <View style={{margin: 10}}>
          <EnhancedText fontWeight='bold' style={{textAlign:'center'}}>{formatNumber(repository.reviewCount)}</EnhancedText>
          <EnhancedText color='textSecondary'>Reviews</EnhancedText>
        </View>
        <View style={{margin: 10}}>
          <EnhancedText fontWeight='bold' style={{textAlign:'center'}}>{formatNumber(repository.ratingAverage)}</EnhancedText>
          <EnhancedText color='textSecondary'>Rating</EnhancedText>
        </View>
      </View>
      {repository.url ? 
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <View style={{backgroundColor: theme.colors.primary, borderRadius: 5}}>
            <Text style={{padding: 10, color: 'white', textAlign:'center'}}>Open in GitHub</Text>
          </View>
        </Pressable>
        : null
      }
    </View>
  );
};

export default RepositoryItem;