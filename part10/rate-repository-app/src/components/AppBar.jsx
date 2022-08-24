import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import Constants from 'expo-constants';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
  },
  appBarTab: {
    backgroundColor: theme.colors.appBar,
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  appBarTabText: {
    color: theme.colors.textAppBar,
  }
});

const AppBarTab = ({text, onPress}) =>  
  <Pressable onPress={onPress} style={styles.appBarTab}>
    <Text style={styles.appBarTabText}>{text}</Text>
  </Pressable>


const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const result = useQuery(ME);

  const isAuthenticated = !result.loading && result.data?.me;

  console.log('me: ', result.data);

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/signin');
  }

  return <View style={styles.appBar}>
    <ScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
      <AppBarTab onPress={()=>navigate('/')} text='Repositories' path='/'/>
      {isAuthenticated ? <>
          <AppBarTab onPress={()=>navigate('/review')} text='Create a review'  path='/review'/>
          <AppBarTab onPress={()=>navigate('/reviews')} text='My reviews'  path='/reviews'/>
          <AppBarTab onPress={signOut} text='Sign Out'  path='/signin'/>
      </> : <>
          <AppBarTab onPress={()=>navigate('/signin')} text='Sign in'  path='/signin'/>
          <AppBarTab onPress={()=>navigate('/signup')} text='Sign up'  path='/signup'/>
      </>}
    </ScrollView>
  </View>;
};

export default AppBar;