import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

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

const AppBarTab = ({text, onPress, path}) =>  
  <Pressable onPress={onPress} style={styles.appBarTab}>
    <Link to={path}>
      <Text style={styles.appBarTabText}>{text}</Text>
    </Link>
  </Pressable>


const AppBar = () => {
  return <View style={styles.appBar}>
    <ScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
      <AppBarTab onPress={()=>{}} text='Repositories' path='/'/>
      <AppBarTab onPress={()=>{}} text='Sign In'  path='/signin'/>
    </ScrollView>
  </View>;
};

export default AppBar;