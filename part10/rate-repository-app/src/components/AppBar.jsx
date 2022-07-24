import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
  },
  appBarTab: {
    backgroundColor: theme.colors.appBar,
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
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
  return <View style={styles.appBar}>
    <AppBarTab onPress={()=>{}} text='Repositories' />
  </View>;
};

export default AppBar;